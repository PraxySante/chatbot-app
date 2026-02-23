import {
	BEARER,
	ERROR_DATABASE_MESSAGE,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	ERROR_SERVER,
	FAILURE_COLLECTION_MESSAGE,
	FAILURE_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { getKeyRedis, updateKeyRedis } from "../../datamapper/redis.datamapper";
import {
	MessageType,
	ResponseFailureType,
	ResponseMessageType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import {
	CreateConversationDirectusAttributes,
	ConversationDirectusAttributes,
} from "../../types/directus.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { createConversationDirectus } from "../Directus/create.service";
import { updateConversationDirectus } from "../Directus/update.service";
import { axiosChatBot } from "./axiosChatBot.service";
import saveError from "./saveError.service";

/**
	 * Request axios continue conversation API-chatbot
	 *
	 * @param {Param} uuid - String uuid
	 *  - Data from Redis
	 * @param {Param} authToken - String token
	 *   - Data from Redis
	 * @param {Request} req - Object contains data :
	 * - **IP du client** (`req.ip`)
	 * - **Body** (`req.body`):
	 *   - `history`: all messages from conversation chatbot-user
	 *   - `message`: recent request from user
	 * @example
    "role": "assistant",
    "content": "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
		}],
		messsage='prendre un rdv ?' }
	 * @returns {Promise<ResponseFailureType | ResponseSuccessType>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @example
	 * Response 200 - Success 
	 * {
    "message": {
        "role": "assistant",
        "content": "Pour prendre un rendez-vous .."
    },
    "sources": [
        {
            "doc_type": "url",
            "doc_ref": "https://www.hopital-foch.com/patient-ou-visiteur/je-prepare-ma-consultation/prendre-rendez-vous/",
            "doc_name": "Prendre rendez-vous - Hôpital Foch"
        }
    ]
}
	 * @throws {400} - Missing ip in request headers
	 * @example
	 * {
	 * message: "Failure",
	 * details: "Missing data",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 */
export async function requestChatToApiChatBot(
	ip: string,
	history: MessageType[],
	message: MessageType,
	uuidSession: string,
): Promise<ResponseFailureType | ResponseSuccessType> {
	if (process.env.COLLECTION_DIRECTUS === undefined) {
		console.error(FAILURE_COLLECTION_MESSAGE);
		return { status: ERROR_SERVER, details: ERROR_DATABASE_MESSAGE };
	}

	let idDirectus: string = "";
	const { status, details }: ResponseKeyRedisType | ResponseFailureType =
		await getKeyRedis(`${ip}-${uuidSession}`);

	// Message Error Typed - error message from Redis
	if (status !== SUCCESS_OK && typeof details === "string") {
		return { status: status, details: details };
	}

	// Message Error Typed - check structure auth
	if (typeof details !== "object" || !("authToken" in details)) {
		return {
			status: ERROR_NOT_AUTHENTIFIED,
			details: ERROR_NOT_AUTHENTIFIED_MESSSAGE,
		};
	}

	if (details?.idDirectus === "") {
		const data: CreateConversationDirectusAttributes = {
			Type: "Chatbot_web",
			Name: details?.project,
			Uuid_LLM: details.uuid,
		};

		const responseDirectus:
			| ConversationDirectusAttributes
			| ResponseFailureType = await createConversationDirectus(
			process.env.COLLECTION_DIRECTUS,
			data,
		);

		if ("details" in responseDirectus) {
			console.error({
				status: responseDirectus.status,
				details: responseDirectus.details,
			});
		}

		if ("id" in responseDirectus) {
			await updateKeyRedis(
				`${ip}-${uuidSession}`,
				"idDirectus",
				responseDirectus?.id,
			);
			idDirectus = responseDirectus.id;
		}
	} else {
		idDirectus = details?.idDirectus;
	}

	try {
		const responseApi: ResponseMessageType = await axiosChatBot.post(
			`/chat/${details?.uuid}`,
			{
				history: [...history],
				message: message,
			},
			{
				headers: {
					Authorization: `${BEARER} ${details?.authToken}`,
				},
			},
		);

		if (
			responseApi.status !== SUCCESS_OK &&
			typeof responseApi.details === "string"
		) {
			return {
				status: responseApi.status,
				message: FAILURE_MESSAGE,
				details: responseApi.details,
			};
		}

		const data: Partial<ConversationDirectusAttributes> = {
			Asked_question: message,
			Model_answer: responseApi.data.message,
			Source_nodes: [...responseApi.data.sources],
			Historic: [...history],
			Uuid_LLM: details.uuid,
		};

		const responseDirectus:
			| ConversationDirectusAttributes
			| ResponseFailureType = await updateConversationDirectus(
			idDirectus,
			process.env.COLLECTION_DIRECTUS,
			data,
		);

		if ("details" in responseDirectus) {
			console.error({
				status: responseDirectus.status,
				details: responseDirectus.details,
			});
		}

		return {
			status: responseApi.status,
			details: responseApi.data.message,
			sources: [...responseApi.data.sources],
		};
	} catch (error: any) {
		console.error("continueChat", error);
		await saveError(
			error,
			details,
			"Chatbot_web",
			"Chatbot_conversation",
			"continueChat",
		);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

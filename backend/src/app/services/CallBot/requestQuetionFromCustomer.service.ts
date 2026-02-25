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
import { getKeyRedis } from "../../datamapper/redis.datamapper";
import {
	ResponseFailureType,
	ResponseMessageType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { axiosChatBot } from "../ChatBot/axiosChatBot.service";
import saveError from "../ChatBot/saveError.service";

/**
   * Request axios continue conversation callbot-API-LLM
   *
   * @param {Param} uuid - String uuid
   *  - Data from Redis
   * @param {Param} authToken - String token
   *   - Data from Redis
   * @param {Request} req - Object contains data :
   * - **IP du client** (`req.ip`)
   * - **Body** (`req.body`):
   *   - `message`: recent request from user
   *   - `history`: all messages from conversation chatbot-user
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
export async function requestQuestionFromCustomerToLLM(
	ip: string,
	question: string,
	uuidSession: string,
): Promise<ResponseFailureType | ResponseSuccessType> {
	if (process.env.COLLECTION_DIRECTUS === undefined) {
		console.error(FAILURE_COLLECTION_MESSAGE);
		return { status: ERROR_SERVER, details: ERROR_DATABASE_MESSAGE };
	}

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

	try {
		const responseApi: ResponseMessageType = await axiosChatBot.post(
			`/chat/${details?.uuid}`,
			{
				history: [],
				message: { role: "user", content: question },
				project: details?.project,
				language: details?.language,
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

		return {
			status: responseApi.status,
			details: responseApi.data.message,
			sources: [...responseApi.data.sources],
		};
	} catch (error: any) {
		console.error("requestQuetionFromCustomerToLLM", error);
		await saveError(
			error,
			details,
			"Callbot",
			"Callbot_conversation",
			"requestQuetionFromCustomerToLLM",
		);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

import {
	ERROR_DATABASE_MESSAGE,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	ERROR_SERVER,
	FAILURE_COLLECTION_MESSAGE,
	FAILURE_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import {
	getKeyRedis,
	updateKeyRedis,
} from "../../datamapper/redis.datamapper";
import {
	MessageType,
	ResponseFailureType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { CallBotDirectusAttributes, ConversationDirectusAttributes } from "../../types/directus.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { createConversationDirectus } from "../Directus/create.service";

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
export async function saveConversaionCallBotToDirectus(
	ip: string,
	history: MessageType[],
	uuidSession: string,
	statut: string,
	firstNameDoctor: string,
	lastNameDoctor: string,
	callingNumber: string,
	dateOfBirth: string,
	lastNamePatient: string,
	firstNamePatient: string,
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

	const data: CallBotDirectusAttributes = {
		Name: details?.project,
		Type: "Callbot",
		Statut: statut,
		Historic: [...history],
		First_name_doctor: firstNameDoctor,
		Last_name_doctor: lastNameDoctor,
		Calling_number: callingNumber,
		Date_of_birth: dateOfBirth,
		Last_name_patient: lastNamePatient,
		First_name_patient: firstNamePatient,
	};

	try {
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
		}

		if ("details" in responseDirectus) {
			console.error({
				status: responseDirectus.status,
				details: responseDirectus.details,
			});
		}

		return {
			status: SUCCESS_OK,
			details: "Conversation Callbot is created",
		};
	} catch (error: any) {
		console.error("saveConversation", error);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

import { getKeyRedis } from "../../datamapper/redis.datamapper";
import {
	MessageType,
	ResponseFailureType,
	ResponseMessageType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { axiosChatBot } from "./axiosChatBot.service";

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
	message: MessageType
): Promise<ResponseFailureType | ResponseSuccessType> {
	const { status, details }: ResponseKeyRedisType | ResponseFailureType =
		await getKeyRedis(ip);

		// Message Error Typed - error message from Redis
		if (status !== 200 && typeof details === "string") {
			return { status: status, details: details };
		}
	
		// Message Error Typed - check structure auth
		if (typeof details !== "object" || !("authToken" in details)) {
			return { status: 401, details: "Not authorized" };
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
					Authorization: `Bearer ${details?.authToken}`,
				},
			}
		);

		if (responseApi.status !== 200 && typeof responseApi.details === "string") {
			return {
				status: responseApi.status,
				message: "failure",
				details: responseApi.details,
			};
		}

		return {
			status: responseApi.status,
			details: responseApi.data.message,
			sources: [...responseApi.data.sources],
		};
	} catch (error: any) {
		console.error(error.message);
		return {
			status: error.status,
			message: "failure",
			details: error?.message,
		};
	}
}

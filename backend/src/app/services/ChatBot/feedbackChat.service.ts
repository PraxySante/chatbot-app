import {
	ERROR_DATABASE_MESSAGE,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	ERROR_SERVER,
	FAILURE_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { getKeyRedis } from "../../datamapper/redis.datamapper";
import {
	ResponseFailureType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { updateConversationDirectus } from "../Directus/update.service";

/**
	 * Request axios feedback conversation API-chatbot
	 *
	 * @param {Body} req - Object contains data :
	 * - **Body** (`req.body`):
	 *   - `vote`: all messages from conversation chatbot-user
	 *   - `message`: recent request from user
	 * @example
	 * {
    "vote": 5,
    "comment": "Top"
		}
	 * @returns {Promise<ResponseFailureType | ResponseSuccessType>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @example
	 * Response 200 - Success 
	 * "success"
	 * @throws {400} - Missing ip in request headers
	 * @example
	 * {
	 * message: "Failure",
	 * details: "Missing data",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 */
export async function feedbackApiChatBot(
	ip: string,
	note: number,
	comment: string
): Promise<ResponseFailureType | ResponseSuccessType> {
	const { status, details }: any = await getKeyRedis(ip);

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
		const data = {
			Satisfaction: note,
			Comments: comment,
		};

		if (process.env.COLLECTION_DIRECTUS === undefined) {
			return { status: ERROR_SERVER, details: ERROR_DATABASE_MESSAGE };
		}

		const responseApi: any = await updateConversationDirectus(
			details?.idDirectus,
			process.env.COLLECTION_DIRECTUS,
			data
		);

		if ("details" in responseApi) {
			return { status: responseApi.status, details: responseApi.details };
		}

		return { status: status, details: responseApi.data.message };
	} catch (error: any) {
		console.error(error);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

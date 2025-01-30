import { getKeyRedis } from "../../datamapper/redis.datamapper";
import {
	ResponseErrorType,
	ResponseFailureType,
	ResponseFeedbackType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { axiosChatBot } from "./axiosChatBot.service";

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
		if (status !== 200 && typeof details === "string") {
			return { status: status, details: details };
		}
	
		// Message Error Typed - check structure auth
		if (typeof details !== "object" || !("authToken" in details)) {
			return { status: 401, details: "Not authorized" };
		}

	try {
		const responseApi: ResponseFeedbackType| ResponseErrorType = await axiosChatBot.post(
			`/chat/feedback/${details?.uuid}`,
			{
				note: note,
				comment: comment,
			},
			{
				headers: {
					Authorization: `Bearer ${details?.authToken}`,
				},
			}
		);

		if ('details' in responseApi) {
			return { status: responseApi.status, details: responseApi.details };
		}


		return { status: status, details: responseApi.data.message };
	} catch (error: any) {
		console.error(error);
		return {
			status: error.status,
			message: "failure",
			details: error?.message,
		};
	}
}

import { getKeyRedis, updateKeyRedis } from "../../datamapper/redis.datamapper";
import {
	ResponseFailureType,
	ResponseStartEndType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { axiosChatBot } from "./axiosChatBot.service";
import { ResponseKeyRedisType } from "../../types/redis.type";
import {
	BEARER,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	FAILURE_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";

/**
 * Request axios Start conversation Api-Chatbot
 *
 * @param {Parameters} ip String IP du client** (`req.ip`)
 *
 * @returns {Promise<Response>} - Return response JSON :
 * - **details**:
 * - **status**
 * @example
 * {
 * status: 200,
 * details: {
 * role: "assistant",
 * content: "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
 * }
 * }
 * @throws {400} - Missing ip in request headers
 * @example
 * {
 * message: "Failure",
 * details: "Missing ip in request headers.",
 * }
 * @throws {500} - Internal Server Error - catched by ControllerWrapper
 */
export async function startChatApiBot(
	ip: string
): Promise<ResponseFailureType | ResponseSuccessType> {
	const { status, details }: ResponseKeyRedisType | ResponseFailureType =
		await getKeyRedis(ip);

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
		const response: ResponseStartEndType = await axiosChatBot.get(
			"/chat/start",
			{
				headers: {
					Authorization: `${BEARER} ${details?.authToken}`,
				},
				data: {
					project: details?.project,
					language: details?.language,
				},
			}
		);

		const { data, status } = response;

		if (status !== SUCCESS_OK) {
			return { status: status, message: FAILURE_MESSAGE, details: data };
		}

		await updateKeyRedis(ip, "uuid", data.uuid);

		return { status: status, details: data.message };
	} catch (error: any) {
		console.error(error.message);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

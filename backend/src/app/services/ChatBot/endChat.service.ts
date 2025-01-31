import { getKeyRedis } from "../../datamapper/redis.datamapper";
import {
	ResponseFailureType,
	ResponseStartEndType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { axiosChatBot } from "./axiosChatBot.service";

/**
 * Request axios Ending conversation Api-Chatbot
 *
 * @param {Parameters} ip String IP du client** (`req.ip`)
 * @returns {Promise<ResponseFailureType | ResponseSuccessType>} - Return response JSON :
 * - **details**:
 * - **status**
 * @example
 * {
status: 200,
 details: {
	  role: "assistant",
	  content: "Au revoir ..."
	}
		}
 * @throws {400} - Missing ip in request headers
 * @example
 * {
 * status: 400
 * message: "Failure",
 * details: "Session 112c8fe876f84bc2a03c677311119329 is not considered active.",
 * }
 * @throws {500} - Internal Server Error - catched by ControllerWrapper
 */
export async function endChatApiBot(
	ip: string
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
		const response: ResponseStartEndType = await axiosChatBot.get("/chat/end", {
			headers: {
				Authorization: `Bearer ${details.authToken}`,
			},
			data: { uuid: details.uuid },
		});

		let { data, status } = response;

		if (status !== 200) {
			return { status: status, message: "failure", details: data };
		}
		return { status: status, details: data.message };
	} catch (error: any) {
		console.error(error);
		return {
			status: error.status,
			message: "failure",
			details: error?.message,
		};
	}
}

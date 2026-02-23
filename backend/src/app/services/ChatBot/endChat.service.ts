import {
	BEARER,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	FAILURE_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { getKeyRedis } from "../../datamapper/redis.datamapper";
import {
	ResponseFailureType,
	ResponseStartEndType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { axiosChatBot } from "./axiosChatBot.service";
import saveError from "./saveError.service";

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
	ip: string,
	uuidSession: string,
): Promise<ResponseFailureType | ResponseSuccessType> {
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
		const response: ResponseStartEndType = await axiosChatBot.get("/chat/end", {
			headers: {
				Authorization: `${BEARER} ${details.authToken}`,
			},
			data: { uuid: details.uuid },
		});

		let { data, status } = response;

		if (status !== SUCCESS_OK) {
			return { status: status, message: FAILURE_MESSAGE, details: data };
		}
		return { status: status, details: data.message };
	} catch (error: any) {
		console.error("endChat", error);
<<<<<<< feat/issue-122/chatbot-security
		await saveError(
			error,
			details,
			"Chatbot_web",
			"Chatbot_conversation",
			"endChat",
		);
=======
>>>>>>> develop
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

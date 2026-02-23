import {
	BEARER,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	FAILURE_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { getKeyRedis } from "../../datamapper/redis.datamapper";
import {
	ResponseErrorType,
	ResponseFailureType,
	ResponseReformulationType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { axiosChatBot } from "./axiosChatBot.service";
import saveError from "./saveError.service";

/** 
	 * Request axios reformulate conversation API-chatbot
	 *
	 * @param {Param} uuid - String uuid
	 *  - Data from Redis
	 * @param {Param} authToken - String token
	 *   - Data from Redis
	 * @returns {Promise<ResponseFailureType | ResponseSuccessType>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @example
	 * Response 200 - Success 
	 * {
    "reformulations": [
        {
            "role": "assistant",
            "content": ". Comment puis-je procéder pour prendre un rendez-vous à l'Hôpital Foch ?"
        },
        {
            "role": "assistant",
            "content": ". Quelles sont les étapes à suivre pour réserver une consultation à l'Hôpital Foch ?"
        },
        {
            "role": "assistant",
            "content": ". Quels sont les moyens disponibles pour fixer un rendez-vous à l'Hôpital Foch ?"
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
export async function reformulationChatToApiChatBot(
	ip: string,
	uuidSession: string,
): Promise<ResponseSuccessType | ResponseFailureType> {
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

	// The request body can be empty.
	try {
		const responseApi: ResponseReformulationType | ResponseErrorType =
			await axiosChatBot.post(
				`/chat/reformulate/${details?.uuid}`,
				{},
				{
					headers: {
						Authorization: `${BEARER} ${details?.authToken}`,
					},
				},
			);

		if ("details" in responseApi) {
			return { status: responseApi.status, details: responseApi.details };
		}

		return {
			status: responseApi.status,
			details: [...responseApi.data.reformulations],
		};
	} catch (error: any) {
		console.error("reformulationChat", error);
		await saveError(
			error,
			details,
			"Chatbot_web",
			"Chatbot_conversation",
			"reformulationChat",
		);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

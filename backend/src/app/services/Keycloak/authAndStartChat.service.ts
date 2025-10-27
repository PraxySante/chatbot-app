import {
	ERROR_BAD_REQUEST,
	ERROR_BAD_REQUEST_MESSSAGE,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	FAILURE_MESSAGE,
	MILLISECONDS,
	SUCCESS_OK,
	SUCCESS_OK_MESSAGE,
} from "../../constant/constant";
import { createKeyRedis, getKeyRedis } from "../../datamapper/redis.datamapper";
import { ResponseAuthChatBot } from "../../types/auth.type";
import {
	ResponseSuccessType,
	ResponseFailureType,
} from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { generateUuidSession } from "../ChatBot/generateUuidSession.service";
import { authChatBot } from "./authChatBot.service";

/**
 * Request axios to Auth0 Machine to Machine
 *
 * @param {Request} req - Object contains data :
 * - **IP du client** (`req.ip`)
 * - **Body** (`req.body`):
 *   - `project`: Company name
 *   - `language`: Language selected
 * @example
 * Requête POST avec un body JSON :
 * { projet: "Praxy IA", language: "fr" }
 * @param {Response} res - Return response failed or success
 * @param {NextFunction} _ - Next not used
 * @returns {Promise<Response>} - Return response JSON :
 * - **details**
 * - **status**
 * @example
 *  Response 200 - Success
 * "Success connection"
 * @throws {400} - Bad request
 * @example
 * {
 * message: "Failure",
 * details: "Missing ip in request headers.",
 * }
 * @throws {500} - Internal Server Error - catched by ControllerWrapper
 */
export async function authAndStartChat(
	ip: string,
	project: string,
	language: string,
	uuidSession: string
): Promise<ResponseFailureType | ResponseSuccessType> {
		// Check presence project and language
		if (!project || !language) {
			return {
				status: ERROR_BAD_REQUEST,
				message: FAILURE_MESSAGE,
				details: ERROR_BAD_REQUEST_MESSSAGE,
			};
		}
	
		const responseRedis: ResponseKeyRedisType | ResponseFailureType =
			await getKeyRedis(`${ip}-${uuidSession}`);
		// Message Error Typed - error message from Redis
		if (
			responseRedis.status !== SUCCESS_OK &&
			typeof responseRedis.details === "string"
		) {
			const responseApi: ResponseFailureType | ResponseAuthChatBot =
				await authChatBot(project);
	
			// Message Error Typed
			const { status, details } = responseApi;
	
			if (
				responseApi.message === FAILURE_MESSAGE.toLowerCase() &&
				typeof details === "string"
			) {
				return { status: status, details: details };
			}
	
			// Message Error Typed
			if (typeof details !== "object" || !("access_token" in details)) {
				return {
					status: ERROR_NOT_AUTHENTIFIED,
					details: ERROR_NOT_AUTHENTIFIED_MESSSAGE,
				};
			}
	
			const uuidSession = generateUuidSession();
	
			// Create an user into Redis
			await createKeyRedis(
				`${ip}-${uuidSession}`,
				JSON.stringify({
					authToken: details.access_token,
					token_expires_in:
						Math.floor(Date.now() / MILLISECONDS) + details?.expires_in,
					startTime: Math.floor(Date.now() / MILLISECONDS),
					project: project,
					language: language,
					uuid: "",
					idDirectus: "",
				})
			);
			return {
				status: SUCCESS_OK,
				details: uuidSession,
			};
		}
	
		// Message Success Typed
		return {
			status: SUCCESS_OK,
			details: uuidSession,
		};
}

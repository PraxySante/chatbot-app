import { createKeyRedis } from "../../datamapper/redis.datamapper";
import { ResponseAuthChatBot } from "../../types/auth.type";
import {
	ResponseSuccessType,
	ResponseFailureType,
} from "../../types/chatbot.type";
import { connectAuth0 } from "./connect.service";

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
	language: string
): Promise<ResponseFailureType | ResponseSuccessType> {
	// Check presence project and language
	if (!project || !language) {
		return {
			status: 400,
			message: "Failure",
			details: "Bad request, missing project or language.",
		};
	}

	const responseApi: ResponseFailureType | ResponseAuthChatBot =
		await connectAuth0();

	// Message Error Typed
	const { status, details } = responseApi;

	if (responseApi.message === "failure" && typeof details === "string") {
		return { status: status, details: details };
	}

		// Message Error Typed
	if (typeof details !== "object" || !("access_token" in details)) {
		return { status: 401, details: "Not authorized" };
	}

	// Create an user into Redis
	await createKeyRedis(
		ip,
		JSON.stringify({
			authToken: details.access_token,
			token_expires_in: Date.now() + details.expires_in,
			startTime: Date.now(),
			project: project,
			language: language,
			uuid: "",
		})
	);

	// Message Success Typed
	return {
		status: status,
		details: "Success connection",
	};
}

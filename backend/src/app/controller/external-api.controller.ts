import { NextFunction, Request, Response } from "express";
import {
	ERROR_BAD_REQUEST,
	FAILURE_MESSAGE,
	FAILURE_MISSING_IP_HEADERS,
	FAILURE_MISSING_UUID_SESSION,
	SUCCESS_OK,
} from "../constant/constant";
import {
	ResponseFailureType,
	ResponseSuccessType,
} from "../types/chatbot.type";
import { saveConversaionCallBotToDirectus } from "../services/CallBot/saveConversation.service";
import { authAndStartChat } from "../services/Keycloak/authAndStartChat.service";
import { requestQuestionFromCustomerToLLM } from "../services/CallBot/requestQuetionFromCustomer.service";
import { updateKeyRedis } from "../datamapper/redis.datamapper";
import { startChatApiBot } from "../services/ChatBot/startChat.service";

export default {
	/**
	 * Request authentification to Auth0 Machine to Machine
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
	async requestAuthTokenExternalApi(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const { project, language, uuidSession } = req.body;
		const { ip } = req;

		if (!ip) {
			return res.status(ERROR_BAD_REQUEST).json({
				message: FAILURE_MESSAGE,
				details: FAILURE_MISSING_IP_HEADERS,
			});
		}

		const { status, details } = await authAndStartChat(
			ip,
			project,
			language,
			uuidSession,
		);

		if (status !== SUCCESS_OK) {
			return res.status(status).send(details);
		}

		req.body = {
			...req.body,
			uuidSession: details,
		};

		updateKeyRedis(`${ip}-${details}`, "uuid", details as string);

		next();
	},

	/**
	 * Save conversation callbot-user
	 *
	 * @param {Request} req - Object contains data :
	 * - **IP du client** (`req.ip`)
	 * - **Body** (`req.body`):
	 *   - `project`: Company name
	 *   - `language`: Language selected
	 *   - `uuidSession`: sessionId from cookie
	 * @example
	 * Requête POST avec un body JSON :
	 * { projet: "Praxy IA", language: "fr", uuidSession:'erzr-erzr-zer" }
	 * @param {Response} res - Return response failed or success
	 * @param {NextFunction} _ - Next not used
	 * @returns {Promise<Response>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @exemple
	 * Response 200 - Success
	 * {
	 *
	 * }
	 * @throws {400} - Missing ip in request headers
	 * @example
	 * {
	 * message: "Failure",
	 * details: "Missing ip in request headers.",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 */
	async saveCallBotConversation(req: Request, res: Response, _: NextFunction) {
		const {
			history,
			uuidSession,
			statut,
			firstNameDoctor,
			lastNameDoctor,
			callingNumber,
			dateOfBirth,
			lastNamePatient,
			firstNamePatient,
		} = req.body;

		const { ip } = req;
		if (!ip) {
			return res.status(ERROR_BAD_REQUEST).json({
				message: FAILURE_MESSAGE,
				details: FAILURE_MISSING_IP_HEADERS,
			});
		}
		try {
			const response: ResponseFailureType | ResponseSuccessType =
				await saveConversaionCallBotToDirectus(
					ip,
					history,
					uuidSession,
					statut,
					firstNameDoctor,
					lastNameDoctor,
					callingNumber,
					dateOfBirth,
					lastNamePatient,
					firstNamePatient,
				);

			return res.status(response.status).json(response.details);
		} catch (error: any) {
			return {
				status: error.status,
				message: FAILURE_MESSAGE,
				details: error?.message,
			};
		}
	},

	/**
	 * Start conversation chatbot-LLM
	 *
	 * @param {Request}} req - Object contains data :
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
	 * - **details**:
	 * - **status**
	 * @example
	 * {
	 * "role": "assistant",
	 * "content": "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
	 *}
	 * @throws {400} - Missing ip in request headers
	 * @example
	 * {
	 * message: "Failure",
	 * details: "Missing ip in request headers.",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 */
	async startChat(
		req: any,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const { ip } = req;
		const { uuidSession } = req.body;
		if (!ip) {
			return res.status(ERROR_BAD_REQUEST).json({
				message: FAILURE_MESSAGE,
				details: FAILURE_MISSING_IP_HEADERS,
			});
		}

		if (!uuidSession) {
			return res.status(ERROR_BAD_REQUEST).json({
				message: FAILURE_MESSAGE,
				details: FAILURE_MISSING_UUID_SESSION,
			});
		}

		const { status, details } = await startChatApiBot(ip, uuidSession);

		if (status !== SUCCESS_OK) {
			return res.status(status).send(details);
		}

		next();
	},

	/**
	 * Request info user to IA conversation callbot-api-llm
	 *
	 * @param {Request} req - Object contains data :
	 * - **IP du client** (`req.ip`)
	 * - **Body** (`req.body`):
	 *   - `project`: Company name
	 *   - `language`: Language selected
	 *   - `uuidSession`: sessionId from cookie
	 * @example
	 * Requête POST avec un body JSON :
	 * { projet: "Praxy IA", language: "fr", uuidSession:'erzr-erzr-zer" }
	 * @param {Response} res - Return response failed or success
	 * @param {NextFunction} _ - Next not used
	 * @returns {Promise<Response>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @exemple
	 * Response 200 - Success
	 * {
	 *
	 * }
	 * @throws {400} - Missing ip in request headers
	 * @example
	 * {
	 * message: "Failure",
	 * details: "Missing ip in request headers.",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 */
	async requestQuestionFromCustomer(
		req: Request,
		res: Response,
		_: NextFunction,
	) {
		const { question, uuidSession } = req.body;

		const { ip } = req;
		if (!ip) {
			return res.status(ERROR_BAD_REQUEST).json({
				message: FAILURE_MESSAGE,
				details: FAILURE_MISSING_IP_HEADERS,
			});
		}
		try {
			const response: ResponseFailureType | ResponseSuccessType =
				await requestQuestionFromCustomerToLLM(ip, question, uuidSession);
			return res.status(response.status).json(response.details);
		} catch (error: any) {
			return {
				status: error.status,
				message: FAILURE_MESSAGE,
				details: error?.message,
			};
		}
	},
};

import { NextFunction, Request, Response } from "express";
import { deleteKeyRedis, updateKeyRedis } from "../datamapper/redis.datamapper";
import { authAndStartChat } from "../services/Keycloak/authAndStartChat.service";
import { requestChatToApiChatBot } from "../services/ChatBot/continueChat.service";
import { endChatApiBot } from "../services/ChatBot/endChat.service";
import { feedbackApiChatBot } from "../services/ChatBot/feedbackChat.service";
import { reformulationChatToApiChatBot } from "../services/ChatBot/reformulationChat.service";
import { startChatApiBot } from "../services/ChatBot/startChat.service";
import {
	ResponseFailureType,
	ResponseSuccessType,
} from "../types/chatbot.type";
import {
	ERROR_BAD_REQUEST,
	ERROR_SERVER,
	ERROR_SERVER_MESSAGE,
	FAILURE_MESSAGE,
	FAILURE_MISSING_IP_HEADERS,
	FAILURE_MISSING_UUID_SESSION,
	SUCCESS_OK,
	USER,
} from "../constant/constant";
import axios from "axios";
import { transcribeAudioChatBot } from "../services/ChatBot/transcribeAudioChatBot.service";
import { getDocument } from "../services/ChatBot/getDocument.service";
import { saveConversaionCallBotToDirectus } from "../services/CallBot/saveConversation.service";

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
	async requestAuthToken(
		req: Request,
		res: Response,
		_: NextFunction,
	): Promise<Response | void> {
		const { project, language, uuidSession } = req.body;
		const { ip } = req;

		if (!ip) {
			return res.status(ERROR_BAD_REQUEST).json({
				message: FAILURE_MESSAGE,
				details: FAILURE_MISSING_IP_HEADERS,
			});
		}

		const { status, details }: any = await authAndStartChat(
			ip,
			project,
			language,
			uuidSession,
		);
		if (!req.url.includes("save-call")) {
			return res.status(status).send(details);
		}

		req.body = {
			...req.body,
			uuidSession: details,
		};
	},

	/**
	 * Start conversation chatbot-user
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
		req: Request,
		res: Response,
		_: NextFunction,
	): Promise<Response> {
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
		return res.status(status).send(details);
	},

	/**
   * Continue conversation chatbot-user
   *
   * @param {Request} req - Object contains data :
   * - **IP du client** (`req.ip`)
   * - **Body** (`req.body`):
   *   - `project`: Company name
   *   - `language`: Language selected
   *   - `history`: all messages from conversation chatbot-user
   *   - `message`: recent request from user
   * @example
   * Requête POST avec un body JSON :
   * { projet: "Praxy IA", language: "fr", history:[{
    "role": "assistant",
    "content": "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
    }],
    messsage='prendre un rdv ?' }
   * @param {Response} res - Return response failed or success
   * @param {NextFunction} _ - Next not used
   * @returns {Promise<Response>} - Return response JSON :
   * - **details**
   * - **status**
   * @exemple
   * Response 200 - Success 
   * {
   * role: "assistant",
   * content: "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
   *}
   * @throws {400} - Missing ip in request headers
   * @example
   * {
   * message: "Failure",
   * details: "Missing ip in request headers.",
   * }
   * @throws {500} - Internal Server Error - catched by ControllerWrapper
   */
	async continueChat(
		req: Request,
		res: Response,
		_: NextFunction,
	): Promise<Response> {
		const { history, message, uuidSession } = req.body;
		const { ip } = req;
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

		const response: ResponseFailureType | ResponseSuccessType =
			await requestChatToApiChatBot(ip, history, message, uuidSession);

		if ("sources" in response) {
			return res
				.status(response.status)
				.json({ details: response.details, sources: response.sources });
		}

		return res.status(response.status).json(response.details);
	},

	/**
   * Reformulate request from conversation chatbot-user
   * 
   * @param {Request} req - Object contains data :
   * - **IP du client** (`req.ip`)
   * - **Body** (`req.body`):
   *   - `project`: Company name
   *   - `language`: Language selected
   *   - `history`: all messages from conversation chatbot-user
   *   - `message`: recent request from user
   * @example
   * Requête POST avec un body JSON :
   * { projet: "Praxy IA", language: "fr", history:[{
    "role": "assistant",
    "content": "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
    }],
    messsage='prendre un rdv ?' }
   * @param {Response} res - Return response failed or success
   * @param {NextFunction} _ - Next not used
   * @returns {Promise<Response>} - Return response JSON :
   * - **details**
   * - **status**
   * @exemple
   * Response 200 - Success 
   * {
   * role: "assistant",
   * content: "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
   *}
   * 
   * [
    {
        "role": "assistant",
        "content": ". Quelles sont les étapes précises pour prendre un rendez-vous à l'Hôpital Foch ?"
    },
    {
        "role": "assistant",
        "content": ". Comment puis-je organiser un rendez-vous médical à l'Hôpital Foch ?"
    },
    {
        "role": "assistant",
        "content": ". Quels moyens sont disponibles pour fixer un rendez-vous à l'Hôpital Foch ?"
    }
]
   * @throws {400} - Missing ip in request headers
   * @example
   * {
   * message: "Failure",
   * details: "Missing ip in request headers.",
   * }
   * @throws {500} - Internal Server Error - catched by ControllerWrapper
   */
	async reformulationChat(
		req: Request,
		res: Response,
		_: NextFunction,
	): Promise<Response> {
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

		const { status, details } = await reformulationChatToApiChatBot(
			ip,
			uuidSession,
		);
		return res.status(status).send(details);
	},

	async getDocumentPdf(req: Request, res: Response, _: NextFunction) {
		const { ip } = req;
		const { uuidSession, urlDocument } = req.body;

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

		const { status, details } = await getDocument(ip, urlDocument, uuidSession);
		res.setHeader("Content-Type", "application/pdf");
		return res.status(status).send(details);
	},

	async requestTranscribeAudio(
		req: Request,
		res: Response,
		_: NextFunction,
	): Promise<Response> {
		try {
			const { audioBase64, uuidSession } = req.body;
			const { ip } = req;

			if (!ip) {
				return res.status(ERROR_BAD_REQUEST).json({
					message: FAILURE_MESSAGE,
					details: FAILURE_MISSING_IP_HEADERS,
				});
			}

			if (!audioBase64 || !uuidSession) {
				return res.status(400).json({
					status: FAILURE_MESSAGE,
					message: "Missing data : audio or uuidSession",
				});
			}

			const response = await transcribeAudioChatBot(
				ip,
				uuidSession,
				audioBase64,
			);

			if (response.status !== SUCCESS_OK) {
				return res.status(400).json({
					status: response.status,
					message: FAILURE_MESSAGE,
					details: response.details,
				});
			}

			return res.json(response.details);
		} catch (error: unknown) {
			console.error("transcribeAudio error:", error);

			if (axios.isAxiosError(error)) {
				return res.status(error.response?.status || 500).json({
					status: error.response?.status || ERROR_SERVER,
					message: FAILURE_MESSAGE,
					details: error.message,
				});
			}

			return res.status(500).json({
				status: ERROR_SERVER,
				message: FAILURE_MESSAGE,
				details: ERROR_SERVER_MESSAGE,
			});
		}
	},

	async restartChat(
		req: Request,
		res: Response,
		_: NextFunction,
	): Promise<Response> {
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

		await updateKeyRedis(`${ip}-${uuidSession}`, "uuid", "");
		await updateKeyRedis(`${ip}-${uuidSession}`, "idDirectus", "");

		const { status, details } = await startChatApiBot(ip, uuidSession);
		console.log(`Conversation is restart`);
		return res.status(status).send(details);
	},

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

		if ("sources" in response) {
			return res
				.status(response.status)
				.json({ details: response.details, sources: response.sources });
		}

		return res.status(response.status).json(response.details);
	},

	/**
   * Ending conversation chatbot-user
   *
   * @param {Request} req - Object contains data :
   * - **IP du client** (`req.ip`)
   * - **Body** (`req.body`):
   *   - `project`: Company name
   *   - `language`: Language selected
   * @example
   * Requête POST avec un body JSON :
   * { projet: "Praxy IA", language: "fr"}
   * 
   * @param {Response} res - Return response failed or success
   * @param {NextFunction} _ - Next not used
   * @returns {Promise<Response>} - Return response JSON :
   * - **details**
   * - **status**
   * @example {200} - Success
   * Response 200 - Success 
   * {
   * role: "assistant",
    content: "Au revoir. N'hésitez pas à revenir en cas de nouvelles questions."
    }
   * @throws {400} - Missing ip in request headers
   * @example
   * {
   * message: "Failure",
   * details: "Missing ip in request headers.",
   * }
   * @throws {500} - Internal Server Error - catched by ControllerWrapper
   *
  */
	async endChat(
		req: Request,
		res: Response,
		_: NextFunction,
	): Promise<Response> {
		const { ip } = req;
		const { uuidSession } = req.body;
		if (!ip) {
			return res.status(400).json({
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

		const { status, details } = await endChatApiBot(ip, uuidSession);
		await deleteKeyRedis(`${ip}-${uuidSession}`);
		await deleteKeyRedis(`${USER}-${uuidSession}-${ip}`);
		console.log(`Conversation is ended`);
		return res.status(status).send(details);
	},

	/**
	 * Feedback conversation chatbot-user
	 *
	 * @param {Request} req - Object contains data :
	 * - **IP du client** (`req.ip`)
	 * - **Body** (`req.body`):
	 *   - `project`: Company name
	 *   - `language`: Language selected
	 *   - `note` : note from user (thumbsup: 5 - neutral: 2 - thumbsdown 0)
	 *   - `comment` : comment from user
	 * @example
	 * Requête POST avec un body JSON :
	 * { projet: "Praxy IA", language: "fr", "note":5, "comment":"Test"}
	 *
	 * @param {Response} res - Return response failed or success
	 * @param {NextFunction} _ - Next not used
	 * @returns {Promise<Response>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @example
	 * Response 200 - Success
	 * success
	 * @throws {400} - Missing ip in request headers
	 * @example
	 * {
	 * message: "Failure",
	 * details: "Missing ip in request headers.",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 *
	 */
	async feedbackChat(
		req: Request,
		res: Response,
		_: NextFunction,
	): Promise<Response> {
		const { note, comment, uuidSession } = req.body;
		const { ip } = req;
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

		const { status, details } = await feedbackApiChatBot(
			ip,
			uuidSession,
			note,
			comment,
		);
		return res.status(status).send(details);
	},
};

import { NextFunction, Request, Response } from "express";
import { deleteKeyRedis } from "../datamapper/redis.datamapper";
import { authAndStartChat } from "../services/Keycloak/authAndStartChat.service";
import { requestChatToApiChatBot } from "../services/ChatBot/continueChat.service";
import { endChatApiBot } from "../services/ChatBot/endChat.service";
import { feedbackApiChatBot } from "../services/ChatBot/feedbackChat.service";
import { reformulationChatToApiChatBot } from "../services/ChatBot/reformulationChat.service";
import { startChatApiBot } from "../services/ChatBot/startChat.service";
import { ResponseFailureType, ResponseSuccessType } from "../types/chatbot.type";

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
		_: NextFunction
	): Promise<Response> {
		const { project, language } = req.body;
		const { ip } = req;

		if (!ip) {
			return res.status(400).json({
				message: "Failure",
				details: "Missing ip in request headers.",
			});
		}

		const { status, details } = await authAndStartChat(ip, project, language);
		return res.status(status).send(details);
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
		_: NextFunction
	): Promise<Response> {
		const { ip } = req;
		if (!ip) {
			return res.status(400).json({
				message: "Failure",
				details: "Missing ip in request headers.",
			});
		}

		const { status, details } = await startChatApiBot(ip);
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
		_: NextFunction
	): Promise<Response> {
		const { history, message } = req.body;
		const { ip } = req;
		if (!ip) {
			return res.status(400).json({
				message: "Failure",
				details: "Missing ip in request headers.",
			});
		}
		const response : ResponseFailureType | ResponseSuccessType = await requestChatToApiChatBot(
			ip,
			history,
			message
		);

		if ('sources' in response) {			
			return res.status(response.status).json({ details: response.details, sources: response.sources });
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
		_: NextFunction
	): Promise<Response> {
		const { ip } = req;
		if (!ip) {
			return res.status(400).json({
				message: "Failure",
				details: "Missing ip in request headers.",
			});
		}
		const { status, details } = await reformulationChatToApiChatBot(ip);
		return res.status(status).send(details);
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
		_: NextFunction
	): Promise<Response> {
		const { ip } = req;
		if (!ip) {
			return res.status(400).json({
				message: "Failure",
				details: "Missing ip in request headers.",
			});
		}
		const { status, details } = await endChatApiBot(ip);
		await deleteKeyRedis(ip);
		await deleteKeyRedis(`user-${ip}`);
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
		_: NextFunction
	): Promise<Response> {
		const { note, comment } = req.body;
		const { ip } = req;
		if (!ip) {
			return res.status(400).json({
				message: "Failure",
				details: "Missing ip in request headers.",
			});
		}
		const { status, details } = await feedbackApiChatBot(ip, note, comment);
		return res.status(status).send(details);
	},
};

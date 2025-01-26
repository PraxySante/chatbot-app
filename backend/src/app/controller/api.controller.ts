import { NextFunction, Request, Response } from "express";
import { removeKey } from "../datamapper/redis.datamapper";
import { getTokenAndStartChat } from "../services/Auth0/getToken.service";
import { requestChatToApiChatBot } from "../services/ChatBot/continueChat.service";
import { endChatApiBot } from "../services/ChatBot/endChat.service";
import { feedbackApiChatBot } from "../services/ChatBot/feedbackChat.service";
import { reformulationChatToApiChatBot } from "../services/ChatBot/reformulationChat.service";
import { startChatApiBot } from "../services/ChatBot/startChat.service";

export default {
	async getRequestToken(req: Request, res: Response, next: NextFunction) {
		const { project, language } = req.body;
		const { ip } = req;
		if (ip) {
			const response = await getTokenAndStartChat(ip, project, language);
			return res.status(response?.status).send(response?.details);
		}
	},

	async startChat(req: Request, res: Response, next: NextFunction) {
		const { ip } = req;
		if (ip) {
			const response = await startChatApiBot(ip);
			return res.status(response?.status).json(response?.details);
		}
	},

	async continueChat(req: Request, res: Response, next: NextFunction) {
		const { history, message } = req.body;
		const { ip } = req;
		if (ip) {
			const response = await requestChatToApiChatBot(ip, history, message);
			if (response.sources?.length !== 0) {
				return res.status(response?.status).json(response);
			} else {
				return res.status(response?.status).json(response);
			}
		}
	},

	async reformulationChat(req: Request, res: Response, next: NextFunction) {
		const { ip } = req;
		if (ip) {
			const response = await reformulationChatToApiChatBot(ip);
			return res.status(response?.status).send(response?.details);
		}
	},

	async endChat(req: Request, res: Response, next: NextFunction) {
		const { ip } = req;
		if (ip) {
			const response = await endChatApiBot(ip);
			await removeKey(ip);
			await removeKey(`user-${ip}`);
			console.log(`conversation is ended`);
			return res.status(response?.status).send(response?.details);
		}
	},

	async feedbackChat(req: Request, res: Response, next: NextFunction) {
		const { note, comment } = req.body;
		const { ip } = req;
		if (ip) {
			const response = await feedbackApiChatBot(ip, note, comment);
			return res.status(response?.status).send(response?.details);
		}
	},
};

import { NextFunction, Request, Response } from "express";
import { axiosChatBot } from "../services/ChatBot/axiosChatBot.service";
import { testPingApiChatBot } from "../services/ChatBot/testPing.service";


export default {
	async testPing(req: Request, res: Response, next: NextFunction) {
		const responseApi = await testPingApiChatBot();
    if (responseApi?.error_code === 400) {
      return res.status(400).json(responseApi.error);
    }
		const { detail, status } = responseApi;

		if (!details) {
			return res.status(status).json(responseApi.ping);
		}

		return res.status(400).json(details);
	},
};

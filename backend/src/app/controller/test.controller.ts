import { NextFunction, Request, Response } from "express";
import { axiosChatBot } from "../services/ChatBot/axiosChatBot.service";
import { testPingApiChatBot } from "../services/ChatBot/testPing.service";


export default {
	async testPing(req: Request, res: Response, next: NextFunction) {
		const response = await axiosChatBot.get("/ping");
		const { status, data } = response;
		if (status === 200) {

			const responseApi = await testPingApiChatBot();
			const { details } = responseApi;

			if (!details) {
				return res.status(status).json(responseApi.ping);
			} else {
				return res.status(400).json(details);
			}
			
		} else {
			return res.status(400).json("Not pong !");
		}
	},
};

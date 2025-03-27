import { NextFunction, Request, Response } from "express";
import { testPingApiChatBot } from "../services/ChatBot/testPing.service";
import { SUCCESS_OK } from "../constant/constant";

export default {
	/**
	 * Reformulate request from conversation chatbot-user
	 *
	 * @param {Request} req - Object contains data :
	 * - **IP du client** (`req.ip`)
	 * - **Body** (`req.body`):
	 *   - `project`: Company name
	 *   - `language`: Language selected
	 * @example
	 * Requête POST avec un body JSON :
	 * { projet: "Praxy IA", language: "fr" }
		messsage='prendre un rdv ?' }
	 * @param {Response} res - Return response failed or success
	 * @param {NextFunction} _ - Next not used
	 * @returns {Promise<Response>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @exemple
	 * Response 200 - Success 
	 * {
	 * ping: "pong"
	 * }
	 * @throws {404} - Not found
	 * @example
	 * {
	 * details: "Not Found",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 */
	async testPing(
		_: Request,
		res: Response,
		__: NextFunction
	): Promise<Response> {
		const responseApi: any = await testPingApiChatBot();

		const { status, details } = responseApi;
		// If error return error message
		if (status !== SUCCESS_OK) {
			return res.status(status).json(details);
		}
		// Return message success
		return res.status(status).json(details);
	},
};

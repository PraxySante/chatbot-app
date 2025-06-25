import { NextFunction, Request, Response } from "express";
import { testPingApiChatBot } from "../services/ChatBot/testPing.service";
import { ERROR_NOT_AUTHENTIFIED, ERROR_NOT_AUTHENTIFIED_MESSSAGE, SUCCESS_OK } from "../constant/constant";
import { getJWE } from "../services/Eloquant/eloquant.service";

export default {
	/**
	 * Test to control between api chabot and api llm
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

	async createToken(req: Request, res: Response, _: NextFunction): Promise<Response>{
	

		if (!req.body) {
			return res.status(ERROR_NOT_AUTHENTIFIED).json(ERROR_NOT_AUTHENTIFIED_MESSSAGE);
		}

		const responseApi: any = await getJWE(req.body);
		console.log("🚀 ~ createToken ~ responseApi:", responseApi)

		// // If error return error message
		// if (status !== SUCCESS_OK) {
		// 	return res.status(status).json(responseApi);
		// }
		// Return message success
		return res.status(200).json(responseApi);
	}
};

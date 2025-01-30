import { NextFunction, Request, Response } from "express";
import { getKeyRedis } from "../datamapper/redis.datamapper";

/**
 * verify if auth on Redis exist chatbot-user
 *
 * @param {Request} req - Object contains data :
 * - **IP du client** (`req.ip`)
 * @example
 * Requête POST avec un body JSON :
 * { projet: "Praxy IA", language: "fr", ..,
 * @param {Response} res - Return response failed or success
 * @param {NextFunction} _ - Next not used
 * @returns {Promise<Response>} - Return response JSON :
 * - **details**
 * - **status**
 * @throws {400} - Missing ip in request headers
 * @example
 * {
 * "Bad request, missing project or language..",
 * "Bad request, no ip provided."
 * "Bad request, wrong project.""
 * }
 * @throws {500} - Internal Server Error - catched by ControllerWrapper
 */
export default async function verifyAuthRedis(
	req: Request,
	res: Response,
	_: NextFunction
): Promise<void | Response> {
	if (!req.ip) {
		return res
			.status(400)
			.json({ message: "Failure", details: "Missing ip in headers." });
	}

	// check good project from Redis
	const { status }: any = await getKeyRedis(req.ip);
	if (status !== 200) {
		console.log(`Stored cache not found for ip ${req.ip}`);
		return res.status(401).json("Not Authentified.");
	}
}

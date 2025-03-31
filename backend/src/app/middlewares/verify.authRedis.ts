import { NextFunction, Request, Response } from "express";
import { deleteKeyRedis, getKeyRedis } from "../datamapper/redis.datamapper";
import { ResponseKeyRedisType } from "../types/redis.type";
import { ResponseFailureType } from "../types/chatbot.type";
import { authAndStartChat } from "../services/Keycloak/authAndStartChat.service";
import { startChatApiBot } from "../services/ChatBot/startChat.service";
import {
	ERROR_BAD_REQUEST,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	FAILURE_MESSAGE,
	FAILURE_MISSING_IP_HEADERS,
	FAILURE_STORED_CACHE,
	FAILURE_TOKEN_EXPIRED,
	MILLISECONDS,
	RESTART,
	SUCCESS_OK,
	USER,
} from "../constant/constant";

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
			.status(ERROR_BAD_REQUEST)
			.json({ message: FAILURE_MESSAGE, details: FAILURE_MISSING_IP_HEADERS });
	}

	// check good project from Redis
	const { status, details }: ResponseKeyRedisType | ResponseFailureType =
		await getKeyRedis(req.ip);

	if (status !== SUCCESS_OK && !req.url.includes(RESTART)) {
		console.log(`${FAILURE_STORED_CACHE} ${req.ip}`);
		await deleteKeyRedis(`${USER}-${req.ip}`);
		await deleteKeyRedis(req.ip);
		return res
			.status(ERROR_NOT_AUTHENTIFIED)
			.json(ERROR_NOT_AUTHENTIFIED_MESSSAGE);
	}

	if (status !== SUCCESS_OK && req.url.includes(RESTART)) {
		const { project, language } = req.body;
		const { ip } = req;
		await deleteKeyRedis(`${USER}-${req.ip}`);
		await authAndStartChat(ip, project, language);
		const { status, details } = await startChatApiBot(ip);
		return res.status(status).send(details);
	}

	if (typeof details === "object" && "token_expires_in" in details) {
		const currentTime = Math.floor(Date.now() / MILLISECONDS);
		if (currentTime > details?.token_expires_in) {
			console.info(`${FAILURE_TOKEN_EXPIRED} ${req.ip}`);
			await deleteKeyRedis(`${USER}-${req.ip}`);
			await deleteKeyRedis(req.ip);
			return res
				.status(ERROR_NOT_AUTHENTIFIED)
				.json(ERROR_NOT_AUTHENTIFIED_MESSSAGE);
		}
	}
}

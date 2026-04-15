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
	FAILURE_MISSING_UUID_SESSION,
	FAILURE_STORED_CACHE,
	FAILURE_TOKEN_EXPIRED,
	MILLISECONDS,
	RESTART,
	SESSION_TTL_SECONDS,
	SUCCESS_OK,
	USER,
} from "../constant/constant";

/**
 * verify if auth on Redis exist chatbot-user
 *
 * @param {Request} req - Object contains data :
 * - **IP du client** (`ip`)
 * - **Body** (`req.body`):
 *   - `project`: Company name
 *   - `language`: Language selected
 *   - `sessionId` : session uiud
 * @example
 * Requête POST avec un body JSON :
 * { projet: "Praxy IA", language: "fr", sessionId: "04344-42340-..." }
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
	next: NextFunction,
): Promise<void | Response> {
	const { project, language, uuidSession } = req.body;
	const { ip } = req;

	if (!ip) {
		return res
			.status(ERROR_BAD_REQUEST)
			.json({ message: FAILURE_MESSAGE, details: FAILURE_MISSING_IP_HEADERS });
	}

	// check good project from Redis
	const { status, details }: ResponseKeyRedisType | ResponseFailureType =
		await getKeyRedis(`${ip}-${uuidSession}`);

	if (status !== SUCCESS_OK && !req.url.includes(RESTART)) {
		console.log(`${FAILURE_STORED_CACHE} ${ip}-${uuidSession}`);
		await deleteKeyRedis(`${USER}-${uuidSession}-${ip}`);
		await deleteKeyRedis(`${ip}-${uuidSession}`);
		return res
			.status(ERROR_NOT_AUTHENTIFIED)
			.json(ERROR_NOT_AUTHENTIFIED_MESSSAGE);
	}

	if (status !== SUCCESS_OK && req.url.includes(RESTART)) {
		console.log(RESTART);
		const uuidSession = req.signedCookies.sessionId;

		if (uuidSession) {
			await deleteKeyRedis(`${USER}-${uuidSession}-${ip}`);
			await deleteKeyRedis(`${ip}-${uuidSession}`);
		}
		const { status, details } = await authAndStartChat(
			ip,
			project,
			language,
			uuidSession,
		);

		if (status !== SUCCESS_OK) {
			return res.status(status).json(details);
		}

		const cookieUuidSession = details as string;

		if (cookieUuidSession) {
			const { status, details } = await startChatApiBot(ip, cookieUuidSession);
			return res
				.cookie("sessionId", cookieUuidSession, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
					signed: true,
					maxAge: SESSION_TTL_SECONDS * 1000,
				})
				.status(status)
				.send(details);
		}
	}

	if (typeof details === "object" && "token_expires_in" in details) {
		const currentTime = Math.floor(Date.now() / MILLISECONDS);
		if (currentTime > details?.token_expires_in) {
			console.info(`${FAILURE_TOKEN_EXPIRED} ${ip}-${uuidSession}`);
			await deleteKeyRedis(`${USER}-${uuidSession}-${ip}`);
			await deleteKeyRedis(`${ip}-${uuidSession}`);
			return res
				.clearCookie("sessionId", {
					httpOnly: true,
					secure: true,
					sameSite: "none",
				})
				.status(ERROR_NOT_AUTHENTIFIED)
				.json(ERROR_NOT_AUTHENTIFIED_MESSSAGE);
		}
	}

	if (typeof details === "object" && "project" in details) {
		if (project !== details?.project) {
			await deleteKeyRedis(`${USER}-${uuidSession}-${ip}`);
			await deleteKeyRedis(`${ip}-${uuidSession}`);
			const { status, details } = await authAndStartChat(
				ip,
				project,
				language,
				uuidSession,
			);

			if (status !== SUCCESS_OK) {
				return res
					.clearCookie("sessionId", {
						httpOnly: true,
						secure: true,
						sameSite: "none",
					})
					.status(status)
					.json(details);
			}

			const cookieUuidSession = details as string;

			if (cookieUuidSession) {
				const { status, details } = await startChatApiBot(
					ip,
					cookieUuidSession,
				);
				return res
					.cookie("sessionId", cookieUuidSession, {
						httpOnly: true,
						secure: true,
						sameSite: "none",
						signed: true,
						maxAge: SESSION_TTL_SECONDS * 1000,
					})
					.status(status)
					.send(details);
			}
		}
	}
	next();
}

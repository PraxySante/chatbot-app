import { NextFunction, Request, Response } from "express";
import { client as redisClient } from "../services/Redis/redis.service";
import {
	ERROR_TOO_MANY_REQUEST,
	ERROR_TOO_MANY_REQUEST_MESSAGE,
	FAILURE_MESSAGE,
	KEY_EXIST,
	MAX_REQUEST_PER_MINUTE,
	ONE_MINUTE,
	USER,
} from "../constant/constant";

/**
 * Request and control limit request Redis
 *
 * @param {Request} req - Object contains data :
 * - **IP du client** (`req.ip`)
 * - **IP du client** (`req.ip`)
 * - **Body** (`req.body`):
 *   - `project`: Company name
 *   - `language`: Language selected
 *   - `uuidSession` : session uiud
 * @example
 * Requête POST avec un body JSON :
 * { projet: "Praxy IA", language: "fr", uuidSession: "04344-42340-. " }
 * @param {Response} res - Return response failed or success
 * @param {NextFunction} _ - Next not used
 * @returns {Promise<Response>} - Return response JSON :
 * - **details**
 * - **status**
 * @throws {429} - Missing ip in request headers
 * @example
 * {
 * 		message: "Failure",
			details: "Too many requests. Please try again later.",
			retryAfter: 60,
 * }
 * @throws {500} - Internal Server Error - catched by ControllerWrapper
 */
export default async function limiterRequestApi(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void | Response> {
	const { uuidSession } = req.body;
	const userId = `${USER}-${uuidSession}-${req.ip}`;

	const request = await redisClient.incr(userId);

	if (request === KEY_EXIST) {
		await redisClient.expire(userId, ONE_MINUTE);
	}

	if (request > MAX_REQUEST_PER_MINUTE) {
		return res.status(ERROR_TOO_MANY_REQUEST).json({
			message: FAILURE_MESSAGE,
			details: ERROR_TOO_MANY_REQUEST_MESSAGE,
			retryAfter: ONE_MINUTE,
		});
	}
	next();
}

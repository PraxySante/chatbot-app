import { NextFunction, Request, Response } from "express";
import { client as redisClient } from "../services/Redis/redis.service";
import {
	KEY_EXIST,
	MAX_REQUEST_PER_MINUTE,
	ONE_MINUTE,
} from "../constant/constant";

/**
 * Request and control limit request Redis
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
	_: NextFunction
) :Promise<void|Response>{
	const userId = `user-${req.ip}`;

	const request = await redisClient.incr(userId);

	if (request === KEY_EXIST) {
		await redisClient.expire(userId, ONE_MINUTE);
	}

	if (request > MAX_REQUEST_PER_MINUTE) {
		return res.status(429).json({
			message: "Failure",
			details: "Too many requests. Please try again later.",
			retryAfter: ONE_MINUTE,
		});
	}
}

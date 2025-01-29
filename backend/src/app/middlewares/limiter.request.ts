import { NextFunction, Request, Response } from "express";
import { client as redisClient } from "../services/Redis/redis.service";

const KEY_EXIST = 1;
const MAX_REQUEST_PER_MINUTE = 6;
const ONE_MINUTE = 60;


export default async function limiterRequestApi(req: Request, res: Response, next: NextFunction) {
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

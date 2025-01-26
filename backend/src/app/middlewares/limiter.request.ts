import { NextFunction, Request, Response } from "express";
import { client as redisClient } from "../services/Redis/redis.service";

export default async function limiterRequestApi(req: Request, res: Response, next: NextFunction) {
	const userId = `user-${req.ip}`;

	const request = await redisClient.incr(userId);

	if (request === 1) {
		await redisClient.expire(userId, 60);
	}

	if (request > 6) {
		return res.status(429).json({
			message: "failure",
			details: "Too many requests. Please try again later.",
		});
	}
}

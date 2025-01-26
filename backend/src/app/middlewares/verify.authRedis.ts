import { NextFunction, Request, Response } from "express";
import { getKey } from "../datamapper/redis.datamapper";

export default async function verifyAuthRedis(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.ip) {
		let storedCache = await getKey(req.ip);
		if (!storedCache) {
			console.error("Not found");
			return { status: 401, message: "failure", details: "Not Authentified !" };
		}
	}
}

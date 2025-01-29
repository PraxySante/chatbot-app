import { NextFunction, Request, Response } from "express";
import { getKey } from "../datamapper/redis.datamapper";

export default async function verifyAuthRedis(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.ip) {
    return { status: 400, message: 'Failure', details: "Missing ip in headers."};
  }

	let storedCache = await getKey(req.ip);
	if (!storedCache) {
		console.error(`Stored cache not found for ip ${req.ip}`);
		return { status: 401, message: "Failure", details: "Not Authentified." };
	}
	next();
}

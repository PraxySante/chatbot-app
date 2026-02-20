import { NextFunction, Request, Response } from "express";
import { ERROR_SERVER, ERROR_SERVER_MESSAGE } from "../constant/constant";
import { getKeyRedis } from "../datamapper/redis.datamapper";

export default async function verifySession(
	req: any,
	res: Response,
	next: NextFunction,
): Promise<void | Response> {
	try {
		const uuidSession = req.signedCookies.sessionId;
		console.log("🚀 ~ verifySession ~ req.signedCookies:", req.signedCookies);
		console.log("🚀 ~ verifySession ~ uuidSession:", uuidSession);

		console.log("req.cookies:", req.cookies);
		console.log("req.signedCookies:", req.signedCookies);

		if (!uuidSession) {
			return res.status(401).json({ message: "Session manquante" });
		}

		const session = await getKeyRedis(`${req.ip}-${uuidSession}`);
		console.log("🚀 ~ verifySession ~ session:", session);

		if (session.status !== 200) {
			return res.status(401).json({ message: "Session expirée ou invalide" });
		}

		req.body = {
			...req.body,
			uuidSession: uuidSession,
		};
		next();
	} catch (error: any) {
		console.error(error);
	}
}

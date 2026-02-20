import { NextFunction, Response } from "express";
import {
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	FAILURE_MESSAGE,
} from "../constant/constant";
import { getKeyRedis } from "../datamapper/redis.datamapper";

export default async function verifySession(
	req: any,
	res: Response,
	next: NextFunction,
): Promise<void | Response> {
	try {
		const uuidSession = req.signedCookies.sessionId;
		console.log("🚀 ~ verifySession ~ uuidSession:", uuidSession);

		if (!uuidSession) {
			return res.status(ERROR_NOT_AUTHENTIFIED).json({
				message: FAILURE_MESSAGE,
				details: ERROR_NOT_AUTHENTIFIED_MESSSAGE,
			});
		}

		const session = await getKeyRedis(`${req.ip}-${uuidSession}`);
		console.log("🚀 ~ verifySession ~ session:", session);

		if (session.status !== 200) {
			return res.status(ERROR_NOT_AUTHENTIFIED).json({
				message: FAILURE_MESSAGE,
				details: ERROR_NOT_AUTHENTIFIED_MESSSAGE,
			});
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

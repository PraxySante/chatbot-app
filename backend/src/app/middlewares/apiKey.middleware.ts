import { Request, Response, NextFunction } from "express";
import {
	ERROR_NOT_AUTHENTIFIED,
	FAILURE_INVALID_CREDENTIALS,
	FAILURE_MESSAGE,
	FAILURE_MISSING_CLIENDID,
} from "../constant/constant";

const clients: any = {
	HFAR_DEV: {
		apiKey: String(process.env.API_KEY_DEV_HFAR),
	},
	HFAR_PROD: {
		apiKey: String(process.env.CLIENT_A_KEY),
	},
};

export default function apiKeyMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const clientId = String(req.headers["x-client-id"]);
	const apiKey = String(req.headers["x-api-key"]);

	if (!clientId || !apiKey) {
		return res.status(ERROR_NOT_AUTHENTIFIED).json({
			message: FAILURE_MESSAGE,
			details: FAILURE_MISSING_CLIENDID,
		});
	}

	const client: any = clients[clientId];

	if (!client || client.apiKey !== apiKey) {
		return res.status(ERROR_NOT_AUTHENTIFIED).json({
			message: FAILURE_MESSAGE,
			details: FAILURE_INVALID_CREDENTIALS,
		});
	}

	next();
}

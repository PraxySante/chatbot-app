import { Request, Response, NextFunction } from "express";
import {
	ERROR_NOT_AUTHENTIFIED,
	FAILURE_INVALID_CREDENTIALS,
	FAILURE_MESSAGE,
	FAILURE_MISSING_CLIENDID,
} from "../constant/constant";

const clients: any = {
	HFAR_DEV: {
		project: "HFAR",
		apiKey: String(process.env.API_KEY_DEV_HFAR),
	},
	HFAR_PROD: {
		project: "HFAR",
		apiKey: String(process.env.API_KEY_PROD_HFAR),
	},
	IRIDIS_DEV: {
		project: "IRIDIS",
		apiKey: String(process.env.API_KEY_DEV_IRIDIS),
	},
	IRIDIS_PROD: {
		project: "IRIDIS",
		apiKey: String(process.env.API_KEY_PROD_IRIDIS),
	},
};

export default function apiKeyMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const { project } = req.body;
	const clientId = String(req.headers["x-client-id"]);
	const apiKey = String(req.headers["x-api-key"]);

	if (!clientId || !apiKey) {
		return res.status(ERROR_NOT_AUTHENTIFIED).json({
			message: FAILURE_MESSAGE,
			details: FAILURE_MISSING_CLIENDID,
		});
	}

	const client: any = clients[clientId];

	if (!client || client.apiKey !== apiKey || client?.project !== project) {
		return res.status(ERROR_NOT_AUTHENTIFIED).json({
			message: FAILURE_MESSAGE,
			details: FAILURE_INVALID_CREDENTIALS,
		});
	}

	next();
}

import { NextFunction, Request, Response } from "express";
import { ERROR_SERVER, ERROR_SERVER_MESSAGE } from "../constant/constant";

export default function controllerWrapper(controllerMw: any) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controllerMw(req, res, next);
		} catch (error: any) {
			console.error(error);
			if (!res.headersSent) {
				res.status(ERROR_SERVER).json({ error: ERROR_SERVER_MESSAGE});
			}
		}
	};
}

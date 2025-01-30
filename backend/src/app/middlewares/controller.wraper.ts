import { NextFunction, Request, Response } from "express";

export default function controllerWrapper(controllerMw: any) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controllerMw(req, res, next);
			if (!res.headersSent) {
				next();
			}
		} catch (error: any) {
			console.error(error);
			if (!res.headersSent) {
				res.status(500).json({ error: "500 Internal Server Error" });
			}
		}
	};
}

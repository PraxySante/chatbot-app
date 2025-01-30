import { NextFunction, Request, Response } from "express";

export default function controllerWrapper(controllerMw: any) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controllerMw(req, res, next);
			next();
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: "500 Internal Server Error" });
		}
	};
}

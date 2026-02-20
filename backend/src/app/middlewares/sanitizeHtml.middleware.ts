import { NextFunction, Request, Response } from "express";
import sanitizeHtml from "sanitize-html";

export const bodySanitizer = (
	req: Request,
	_: Response,
	next: NextFunction,
) => {
	Object.keys(req.body).forEach((key) => {
		if (typeof req.body[key] === "string") {
			req.body[key] = sanitizeHtml(req.body[key]);
		}
	});

	next();
};

import { NextFunction, Request, Response } from "express";
import { getKey } from "../datamapper/redis.datamapper";

export default async function verifyOrigin(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { project, language } = req.body;
	const { ip } = req;

	if (!project || !language) {
		return res.status(400).json("Bad request, missing origin and language !");
	} else {
		if (ip) {
			const storedData = await getKey(ip);
			if (storedData?.project !== project) {
				return res
					.status(400)
					.json("Bad request, missing origin and language !");
			}
		}
	}
}

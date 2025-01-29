import { NextFunction, Request, Response } from "express";
import { getKey } from "../datamapper/redis.datamapper";

export default async function verifyOrigin(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { project, language } = req.body;
	const { ip } = req;

  // validate body 
	if (!project || !language) {
		return res.status(400).json("Bad request, missing project or language.");
	}
  
  // check ip exist
	if (!ip) {
    return res.status(400).json("Bad request, no ip provided.");
  }
  
  // check good project
	const storedData = await getKey(ip);
	if (storedData?.project !== project) {
		return res
			.status(400)
			.json("Bad request, wrong project.");
	}

  next();
}

import { NextFunction, Request, Response } from "express";
import { getKeyRedis } from "../datamapper/redis.datamapper";
import {
	ERROR_BAD_REQUEST,
	ERROR_BAD_REQUEST_MESSSAGE,
} from "../constant/constant";

/**
 * Request and control project and language
 *
 * @param {Request} req - Object contains data :
 * - **IP du client** (`req.ip`)
 * - **Body** (`req.body`):
 *   - `project`: Company name
 *   - `language`: Language selected
 * @example
 * Requête POST avec un body JSON :
 * { projet: "Praxy IA", language: "fr", ..,
 * @param {Response} res - Return response failed or success
 * @param {NextFunction} _ - Next not used
 * @returns {Promise<Response>} - Return response JSON :
 * - **details**
 * - **status**
 * @throws {400} - Missing ip in request headers
 * @example
 * {
 * "Bad request, missing project or language..",
 * "Bad request, no ip provided."
 * "Bad request, wrong project.""
 * }
 * @throws {500} - Internal Server Error - catched by ControllerWrapper
 */
export default async function verifyOrigin(
	req: Request,
	res: Response,
	_: NextFunction
): Promise<void | Response> {
	const { project, language } = req.body;
	const { ip } = req;

	// validate body
	if (!project || !language) {
		return res.status(ERROR_BAD_REQUEST).json(ERROR_BAD_REQUEST_MESSSAGE);
	}

	// check ip exist
	if (!ip) {
		return res.status(ERROR_BAD_REQUEST).json(ERROR_BAD_REQUEST_MESSSAGE);
	}
}

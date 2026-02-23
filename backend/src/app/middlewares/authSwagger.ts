import { RequestHandler } from "express";
import {
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	FAILURE_INVALID_CREDENTIALS,
} from "../constant/constant";

const swaggerAuth: RequestHandler = (req, res, next) => {
	const auth = req.headers.authorization;

	if (!auth || !auth.startsWith("Basic ")) {
		res.setHeader("WWW-Authenticate", 'Basic realm="Swagger"');
		res.status(ERROR_NOT_AUTHENTIFIED).send(ERROR_NOT_AUTHENTIFIED_MESSSAGE);
		return;
	}

	const username = String(`${process.env.SWAGGER_USERNAME}`);
	const password = String(`${process.env.SWAGGER_PASSWORD}`);

	const base64Credentials = auth.split(" ")[1];
	const credentials = Buffer.from(base64Credentials, "base64").toString(
		"ascii",
	);
	const [user, pass] = credentials.split(":");

	if (user === username && pass === password) {
		next();
		return;
	}

	res.setHeader("WWW-Authenticate", 'Basic realm="Swagger"');
	res.status(ERROR_NOT_AUTHENTIFIED).send(FAILURE_INVALID_CREDENTIALS);
};

export default swaggerAuth;

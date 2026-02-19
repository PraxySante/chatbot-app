import { RequestHandler } from "express";

const swaggerAuth: RequestHandler = (req, res, next) => {
	const auth = req.headers.authorization;

	if (!auth || !auth.startsWith("Basic ")) {
		res.setHeader("WWW-Authenticate", 'Basic realm="Swagger"');
		res.status(401).send("Authentication required.");
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
	res.status(401).send("Invalid credentials.");
};

export default swaggerAuth;

import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as apiRouter } from "./app/router/index";
import { connectRedis } from "./app/services/Redis/redis.service";
import { createServer } from "http";

import jsDoc from "./app/services/Swagger/swagger";
import swaggerAuth from "./app/middlewares/authSwagger";
import cookieParser from "cookie-parser";
import { bodySanitizer } from "./app/middlewares/sanitizeHtml.middleware";
const app = express();
const server = createServer(app);
//new WebSocketServerClass(server);

const allowedOrigins = process.env.ORIGIN?.split(",");
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) {
				return callback(null, true);
			}
			if (allowedOrigins && allowedOrigins.includes(origin)) {
				return callback(null, origin);
			} else {
				console.log("Not allowed by CORS, origin", origin);
				return callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);

app.use(cookieParser(String(process.env.COOKIE_SECRET)));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodySanitizer);

app.use("/api/api-docs", swaggerAuth);
app.use("/api/api-map", swaggerAuth);
jsDoc(app);
app.use("/api", apiRouter);

const PORT = process.env.PORT || 8000;

server.listen(PORT, async () => {
	await connectRedis();
	console.log(`🚀 Server listening on port ${PORT} 🚀`);
});

import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as apiRouter } from "./app/router/index";
import { connectRedis } from "./app/services/Redis/redis.service";
import { createServer } from "http";
import { WebSocketServerClass } from "./app/services/WebSocketServer/webSocketServer.class";

const app = express();
const server = createServer(app);
new WebSocketServerClass(server);

app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);

const PORT = process.env.PORT || 8000;

server.listen(PORT, async () => {
	await connectRedis();
	console.log(`🚀 Server listening on port ${PORT} 🚀`);
});

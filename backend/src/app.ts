import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as apiRouter } from "./app/router/index";
import { connectRedis } from "./app/services/Redis/redis.service";

const app = express();

app.use(cors({ origin: `${process.env.ORIGIN}` }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
	await connectRedis();
	console.log(`🚀 Server listening at http://localhost:${PORT}/api 🚀 `);
});

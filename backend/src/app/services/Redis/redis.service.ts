import { createClient } from "redis";
import {
	ERROR_REDIS_MESSAGE,
	FAILURE_REDIS_MESSAGE,
} from "../../constant/constant";

const port = Number(process.env.PORT_REDIS) || 6379;
const host = process.env.HOST_REDIS;

export const client = createClient({
	socket: {
		host: host,
		port: port,
	},
});

client.on("error", (err) => console.log(ERROR_REDIS_MESSAGE, err));

export async function connectRedis() {
	try {
		await client.connect();
		console.log(`Redis connected on port ${host}:${port}`);
	} catch (error: any) {
		console.log("Redis", error);
		console.log(FAILURE_REDIS_MESSAGE, error?.message);
	}
}

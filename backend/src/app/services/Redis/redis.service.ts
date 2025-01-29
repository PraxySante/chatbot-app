import { createClient } from "redis";

const port = Number(process.env.PORT_REDIS) || 6379;
const host = process.env.HOST_REDIS;

export const client = createClient({
	socket: {
		host: host,
		port: port,
	},
});

client.on("error", (err) => console.log("Redis Client Error", err));

export async function connectRedis() {
	try {
		await client.connect();
		console.log(`Redis connected on port ${host}:${port}`);
	} catch (error: any) {
		console.log("Failed to connect to Redis", error?.message);
	}
}

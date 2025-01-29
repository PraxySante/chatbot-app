import { createClient } from "redis";

export const client = createClient({
	socket: {
		host: process.env.HOST_REDIS,
		port: Number(process.env.POST_REDIS) || 6379,
	},
});

client.on("error", (err) => console.log("Redis Client Error", err));

export async function connectRedis() {
	try {
		await client.connect();
		console.log("Redis connected !");
	} catch (error: any) {
		console.log("Impossible to be connected to Redis", error?.message);
	}
}

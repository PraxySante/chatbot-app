import { createClient } from "redis";

export const client = createClient({
	socket: {
		host: "redis",
		port: 6379,
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

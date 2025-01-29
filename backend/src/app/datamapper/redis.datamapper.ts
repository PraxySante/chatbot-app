import { client as redisClient } from "../services/Redis/redis.service";

const ONE_HOUR = 60 * 60;

async function isKeyExist(key: string) {
	try {
		const value = await redisClient.get(key);
		return value !== null ? true : false;
	} catch (error: any) {
		console.error("Impossible to be connected to Redis", error?.message);
	}
}

async function getKey(key: string) {
	try {
		const isExist = await isKeyExist(key);
		if (isExist) {
			const response = await redisClient.get(key);
			return response ? JSON.parse(response) : null;
		}
	} catch (error: any) {
		console.error("Impossible to be connected to Redis", error?.message);
	}
}

async function setKey(key: string, value: any) {
	try {
		const isExist = await isKeyExist(key);
		if (!isExist) {
			await redisClient.set(key, value, { EX: ONE_HOUR });
		}
	} catch (error: any) {
		console.error("Impossible to be connected to Redis", error?.message);
	}
}

async function updateKey(key: string, value: any) {
	try {
		const storedData = await getKey(key);
		if (storedData) {
			storedData.uuid = value;
			await redisClient.set(key, JSON.stringify(storedData), { EX: 60 * 60 });
		}
	} catch (error: any) {
		console.error("Impossible to be connected to Redis", error?.message);
	}
}

async function removeKey(key: string) {
	try {
		const storedData = await getKey(key);
		if (storedData) {
			await redisClient.del(key);
		}
	} catch (error: any) {
		console.error("Failed to connect to Redis", error?.message);
	}
}

export { setKey, updateKey, getKey, removeKey };

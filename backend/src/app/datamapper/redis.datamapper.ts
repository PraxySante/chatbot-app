import {
	ERROR_NOT_FOUND,
	ERROR_NOT_FOUND_MESSAGE,
	FAILURE_REDIS_MESSAGE,
	SESSION_TTL_SECONDS,
	SUCCESS_OK,
} from "../constant/constant";
import { client as redisClient } from "../services/Redis/redis.service";
import { ResponseFailureType } from "../types/chatbot.type";
import { KeyRedisType, ResponseKeyRedisType } from "../types/redis.type";

/**
 * Check Key Redis exist into db
 *
 * @param keyRedis  String ip user :
 *
 * @example
 * Response 200 - Success
 * Return true / false
 *
 * @throws {400} - Error message
 * @throws {500} - Error message
 */
async function doKeyRedisExist(
	keyRedis: string,
): Promise<boolean | ResponseFailureType> {
	try {
		const value: string | null = await redisClient.get(keyRedis);
		return value !== null ? true : false;
	} catch (error: any) {
		console.log("Failed to connect to Redis", error?.message);
		return { status: error?.status, details: error.message };
	}
}

/**
 * Get Key Redis exist into db
 *
 * @param keyRedis  String ip user :
 *
 * @example
 * Response 200 - Success
 * Return :
 * {
 * authToken:"eyJhbGci....,startTime:1738189534703"
 * project:"Praxy.ai"
 * language:"fr"
 * uuid:"b72abdbd64eb424cab2e704c79b5b9c3"
 * }
 *
 * @throws {400} - Error message
 * @example
 * Return :
 * {
 * status:"404"
 * details :"Not found data."
 * }
 * @throws {500} - Error message
 */
async function getKeyRedis(
	keyRedis: string,
): Promise<ResponseKeyRedisType | ResponseFailureType> {
	try {
		const isExist = await doKeyRedisExist(keyRedis);

		if (typeof isExist !== "boolean") {
			return { status: ERROR_NOT_FOUND, details: ERROR_NOT_FOUND_MESSAGE };
		}

		const responseRedis: string | null = await redisClient.get(keyRedis);

		if (!responseRedis) {
			return { status: ERROR_NOT_FOUND, details: ERROR_NOT_FOUND_MESSAGE };
		}

		const storedData = JSON.parse(responseRedis);

		const result = { status: SUCCESS_OK, details: storedData };
		return result;
	} catch (error: any) {
		console.log(FAILURE_REDIS_MESSAGE, error?.message);
		return { status: error?.status, details: error.message };
	}
}

/**
 * Create Key Redis exist into db
 *
 * @param keyRedis  String ip user
 *
 * @throws {404} - Error message
 * @example
 * Return :
 * {
 * status:404
 * details :"Not found data."
 * }
 * @throws {500} - Error message
 */
async function createKeyRedis(
	keyRedis: string,
	value: string,
): Promise<void | ResponseFailureType> {
	try {
		const isExist = await doKeyRedisExist(keyRedis);

		if (typeof isExist !== "boolean") {
			return { status: ERROR_NOT_FOUND, details: ERROR_NOT_FOUND_MESSAGE };
		}

		await redisClient.set(keyRedis, value, { EX: SESSION_TTL_SECONDS });
	} catch (error: any) {
		console.log(FAILURE_REDIS_MESSAGE, error?.message);
		return { status: error?.status, details: error.message };
	}
}

/**
 * Update Key Redis - update user into db according to ip
 *
 * @param keyRedis  String ip user
 * @param value String uuid
 *
 * @throws {400} - Error message
 * @example
 * Return :
 * {
 * status:404
 * details :"Not found data."
 * }
 * @throws {500} - Error message
 */
async function updateKeyRedis(
	keyRedis: string,
	keyValue: string,
	value: string,
): Promise<void | ResponseFailureType> {
	try {
		const isExist = await doKeyRedisExist(keyRedis);

		if (typeof isExist !== "boolean") {
			return { status: ERROR_NOT_FOUND, details: ERROR_NOT_FOUND_MESSAGE };
		}

		if (!isExist) {
			return { status: ERROR_NOT_FOUND, details: ERROR_NOT_FOUND_MESSAGE };
		}

		const { status, details } = await getKeyRedis(keyRedis);

		if (status !== SUCCESS_OK && typeof details === "string") {
			return {
				status: status,
				details: details,
			};
		}

		const storedData = details as KeyRedisType;
		switch (keyValue) {
			case "uuid":
				storedData.uuid = value;
				break;
			case "idDirectus":
				storedData.idDirectus = value;
				break;
			case "language":
				storedData.language = value;
				break;

			default:
				break;
		}
		
		const remainingTTL = await redisClient.ttl(keyRedis);
		await redisClient.set(keyRedis, JSON.stringify(storedData), {
			EX: remainingTTL > 0 ? remainingTTL : SESSION_TTL_SECONDS,
		});
	} catch (error: any) {
		console.log(FAILURE_REDIS_MESSAGE, error?.message);
		return { status: error.status, details: error.message };
	}
}

/**
 * Delete Key Redis - delete data user into db according to ip
 *
 * @param keyRedis  String ip user
 *
 * @throws {400} - Error message
 * @example
 * Return :
 * {
 * status:404
 * details :"Not found data."
 * }
 * @throws {500} - Error message
 */
async function deleteKeyRedis(
	keyRedis: string,
): Promise<void | ResponseFailureType> {
	try {
		const isExist = await doKeyRedisExist(keyRedis);

		if (typeof isExist !== "boolean") {
			return { status: ERROR_NOT_FOUND, details: ERROR_NOT_FOUND_MESSAGE };
		}

		if (!isExist) {
			return { status: ERROR_NOT_FOUND, details: ERROR_NOT_FOUND_MESSAGE };
		}

		await redisClient.del(keyRedis);
	} catch (error: any) {
		console.error(FAILURE_REDIS_MESSAGE, error?.message);
		return { status: error.status, details: error.message };
	}
}

export { createKeyRedis, updateKeyRedis, getKeyRedis, deleteKeyRedis };

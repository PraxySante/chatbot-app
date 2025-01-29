import { getKey, updateKey } from "../../datamapper/redis.datamapper";
import { axiosChatBot } from "./axiosChatBot.service";

export async function startChatApiBot(ip: string) {
	const storedCache = await getKey(ip);
	try {
		const response: any = await axiosChatBot.get("/chat/start", {
			headers: {
				Authorization: `Bearer ${storedCache?.authToken}`,
			},
			data: {
				project: storedCache?.project,
				language: storedCache?.language,
			},
		});

		let { data, status, details } = response;

		if (details) {
			return { status: status, message: "failure", details: details };
		}

		if (status === 200) {
			await updateKey(ip, data.uuid);
			return { status: status, details: data.message };
		} else {
			return { status: status, message: "failure", details: details };
		}
	} catch (error: any) {
		console.error(error);
		return {
			status: error.status,
			message: "failure",
			details: error?.message,
		};
	}
}

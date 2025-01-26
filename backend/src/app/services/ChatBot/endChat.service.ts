import { getKey } from "../../datamapper/redis.datamapper";
import { axiosChatBot } from "./axiosChatBot.service";

export async function endChatApiBot(ip: string) {
	const storedCache = await getKey(ip);

	try {
		const response: any = await axiosChatBot.get("/chat/end", {
			headers: {
				Authorization: `Bearer ${storedCache?.authToken}`,
			},
			data: { uuid: storedCache?.uuid },
		});

		const { data, status, details } = response;

		if (status === 200) {
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

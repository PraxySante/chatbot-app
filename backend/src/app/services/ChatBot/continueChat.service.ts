import { getKey } from "../../datamapper/redis.datamapper";
import { axiosChatBot } from "./axiosChatBot.service";

export async function requestChatToApiChatBot(
	ip: string,
	history: any[],
	message: any
) {
	const storedCache = await getKey(ip);

	try {
		const response: any = await axiosChatBot.post(
			`/chat/${storedCache?.uuid}`,
			{
				history: [...history],
				message: message,
			},
			{
				headers: {
					Authorization: `Bearer ${storedCache?.authToken}`,
				},
			}
		);
		let { data, status, details } = response;

		if (details) {
			return { status: status, message: "failure", details: details };
		}

		if (status === 200) {
			return {
				status: status,
				details: data.message,
				sources: [...data.sources],
			};
		} else {
			return { status: status, message: "failure", details: details };
		}
	} catch (error: any) {
		console.error(error.message);
		return {
			status: error.status,
			message: "failure",
			details: error?.message,
		};
	}
}

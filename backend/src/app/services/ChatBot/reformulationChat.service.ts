import { getKey } from "../../datamapper/redis.datamapper";
import { axiosChatBot } from "./axiosChatBot.service";

export async function reformulationChatToApiChatBot(ip: string) {
	const storedCache = await getKey(ip);

	// The request body can be empty.
	try {
		const response: any = await axiosChatBot.post(
			`/chat/reformulate/${storedCache?.uuid}`,
			{},
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
			return { status: status, details: data.reformulations };
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

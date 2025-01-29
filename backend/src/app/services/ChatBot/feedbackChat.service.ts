import { getKey } from "../../datamapper/redis.datamapper";
import { axiosChatBot } from "./axiosChatBot.service";

export async function feedbackApiChatBot(
	ip: string,
	note: number,
	comment: string
) {
	const storedCache = await getKey(ip);

	try {
		const response: any = await axiosChatBot.post(
			`/chat/feedback/${storedCache?.uuid}`,
			{
				note: note,
				comment: comment,
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
			return { status: status, details: data.message, sources: data.sources };
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

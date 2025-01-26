import { axiosChatBot } from "./axiosChatBot.service";

export async function testPingApiChatBot() {
	try {
		const response = await axiosChatBot.get("/ping");
		const { data, status } = response;
		if (status === 200) {
			return data;
		} else {
			return data;
		}
	} catch (error: any) {
		console.error(error);
		return{ message: "failure", details: error?.message };
	}
}
import { axiosChatBot } from "./axiosChatBot.service";
import {
	PingType,
	ResponseFailureType,
	ResponsePingType,
} from "../../types/chatbot.type";
import saveError from "./saveError.service";

export async function testPingApiChatBot(): Promise<
	PingType | ResponseFailureType
> {
	try {
		const responseApi: ResponsePingType = await axiosChatBot.get("/ping");
		const { status, data } = responseApi;
		return { status: status, details: data };
	} catch (error: any) {
		console.error("testPing", error);
		return { status: error.status, details: error.message };
	}
}

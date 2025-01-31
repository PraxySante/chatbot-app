import { axiosChatBot } from "./axiosChatBot.service";
import {
	PingType,
	ResponseFailureType,
	ResponsePingType,
} from "../../types/chatbot.type";

export async function testPingApiChatBot(): Promise<
	PingType | ResponseFailureType
> {
	try {
		const responseApi: ResponsePingType = await axiosChatBot.get("/ping");
		const { status, data } = responseApi;
		return { status: status, details: data };
	} catch (error: any) {
		return { status: error.status, details: error.message };
	}
}

import { AxiosResponse } from "axios";
import { axiosChatBot } from "./axiosChatBot.service";

export async function testPingApiChatBot(): Promise<AxiosResponse<any, number> | { }> {
	try {
		return axiosChatBot.get("/ping");
	} catch (error: any) {
		console.error(error);
		return error; 
	}
}

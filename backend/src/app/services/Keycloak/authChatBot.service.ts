import { ResponseAuthChatBot } from "../../types/auth.type";
import { ResponseFailureType } from "../../types/chatbot.type";
import { axiosChatBot } from "../ChatBot/axiosChatBot.service";
import { axiosKeycloak } from "./axiosKeycloak.service";

export async function authChatBot(): Promise<
	ResponseAuthChatBot | ResponseFailureType
  > {
	try {
		const responseApi = await axiosKeycloak.post(
			"/user/token",
      {
        username: process.env.KEYCLOAK_USERNAME,
        password: process.env.KEYCLOAK_PASSWORD,
      }
		);

		const { status, data } = responseApi;

		// return Message Error Typed
		if (status !== 200) {
			return {
				status: status,
				message: "failure",
				details: data?.message,
			};
		}

		// return Message Success Typed
		return {
			status: status,
			message: "success",
			details: data,
		};
	} catch (error: any) {
		console.error(error);
		// return Message Error Typed
		return {
			status: error.status,
			message: "failure",
			details: error?.message,
		};
	}
}

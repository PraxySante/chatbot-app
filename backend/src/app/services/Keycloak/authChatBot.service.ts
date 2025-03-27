import {
	FAILURE_MESSAGE,
	SUCCESS_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { ResponseAuthChatBot } from "../../types/auth.type";
import { ResponseFailureType } from "../../types/chatbot.type";
import { axiosKeycloak } from "./axiosKeycloak.service";

export async function authChatBot(): Promise<
	ResponseAuthChatBot | ResponseFailureType
> {
	try {
		const responseApi = await axiosKeycloak.post("/user/token", {
			username: process.env.KEYCLOAK_USERNAME,
			password: process.env.KEYCLOAK_PASSWORD,
		});

		const { status, data } = responseApi;

		// return Message Error Typed
		if (status !== SUCCESS_OK) {
			return {
				status: status,
				message: FAILURE_MESSAGE,
				details: data?.message,
			};
		}

		// return Message Success Typed
		return {
			status: status,
			message: SUCCESS_MESSAGE,
			details: data,
		};
	} catch (error: any) {
		console.error(error);
		// return Message Error Typed
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

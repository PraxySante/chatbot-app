import { ResponseAuthChatBot } from "../../types/auth.type";
import {
	ResponseFailureType,
} from "../../types/chatbot.type";
import { axiosAuth0 } from "./axiosAuth0.service";

export async function connectAuth0(): Promise<
	ResponseAuthChatBot | ResponseFailureType
> {
	try {
		const responseApi = await axiosAuth0.post("", {
			client_id: process.env.AUTH0_CLIENTID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
			audience: process.env.AUTH0_AUDIENCE,
			grant_type: process.env.AUTH0_GRANT_TYPE,
		});

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

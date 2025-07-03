import {
	FAILURE_MESSAGE,
	SUCCESS_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { ResponseAuthChatBot } from "../../types/auth.type";
import { ResponseFailureType } from "../../types/chatbot.type";
import { axiosKeycloak } from "./axiosKeycloak.service";

export async function authChatBot(
	project: string
): Promise<ResponseAuthChatBot | ResponseFailureType> {
	let dataProject: { username: string; password: string } = {
		username: "",
		password: "",
	};

	switch (true) {
		case project.includes(String(process.env.PROJECT_FOCH)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_FOCH),
				password: String(process.env.KEYCLOAK_PASSWORD_FOCH),
			};
			break;
		case project.includes(String(process.env.PROJECT_ESC)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_ESC),
				password: String(process.env.KEYCLOAK_PASSWORD_ESC),
			};
			break;
		case project.includes(String(process.env.PROJECT_AHP)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_AHP),
				password: String(process.env.KEYCLOAK_PASSWORD_AHP),
			};
			break;
		case project.includes(String(process.env.PROJECT_HSPJ)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_HSPJ),
				password: String(process.env.KEYCLOAK_PASSWORD_HSPJ),
			};
			break;
		case project.includes(String(process.env.PROJECT_ENNOV)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_ENNOV),
				password: String(process.env.KEYCLOAK_PASSWORD_ENNOV),
			};
			break;
		default:
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_DEV),
				password: String(process.env.KEYCLOAK_PASSWORD_DEV),
			};
			break;
	}

	try {
		const responseApi = await axiosKeycloak.post("/user/token", dataProject);

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

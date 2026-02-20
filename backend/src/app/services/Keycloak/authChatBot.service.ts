import {
	FAILURE_MESSAGE,
	SUCCESS_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { ResponseAuthChatBot } from "../../types/auth.type";
import { ResponseFailureType } from "../../types/chatbot.type";
import { axiosKeycloak } from "./axiosKeycloak.service";

export async function authChatBot(
	project: string,
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
		case project.includes(String(process.env.PROJECT_AHP)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_AHP),
				password: String(process.env.KEYCLOAK_PASSWORD_AHP),
			};
			break;
		case project.includes(String(process.env.PROJECT_HPSJ)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_HPSJ),
				password: String(process.env.KEYCLOAK_PASSWORD_HPSJ),
			};
			break;
		case project.includes(String(process.env.PROJECT_ENNOV)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_ENNOV),
				password: String(process.env.KEYCLOAK_PASSWORD_ENNOV),
			};
			break;
		case project.includes(String(process.env.PROJECT_CCIB)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_CCIB),
				password: String(process.env.KEYCLOAK_PASSWORD_CCIB),
			};
			break;
		case project.includes(String(process.env.PROJECT_DA)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_DA),
				password: String(process.env.KEYCLOAK_PASSWORD_DA),
			};
			break;
		case project.includes(String(process.env.PROJECT_MCJR)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_MCJR),
				password: String(process.env.KEYCLOAK_PASSWORD_MCJR),
			};
			break;
		case project.includes(String(process.env.PROJECT_HFAR)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_HFAR),
				password: String(process.env.KEYCLOAK_PASSWORD_HFAR),
			};
			break;
		case project.includes(String(process.env.PROJECT_CQFD)):
			dataProject = {
				username: String(process.env.KEYCLOAK_USERNAME_CQFD),
				password: String(process.env.KEYCLOAK_PASSWORD_CQFD),
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
		console.error("authChatBot", error);
		// return Message Error Typed
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

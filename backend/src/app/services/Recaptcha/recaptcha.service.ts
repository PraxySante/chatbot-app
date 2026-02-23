import {
	FAILURE_MESSAGE,
	SUCCESS_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import {
	ResponseFailureType,
	ResponseSuccessType,
} from "../../types/chatbot.type";
import { axiosGoogle } from "./axiosGoogle.service";

export async function verifyUserReCaptchaGoogle(
	token: string,
): Promise<ResponseFailureType | ResponseSuccessType> {
	try {
		const { data } = await axiosGoogle.post("", {
			event: {
				token: token,
				siteKey: process.env.KEY_SITE,
				expectedAction: "LOGIN",
			},
		});

		if (data.riskAnalysis.score < 0.5) {
			return {
				status: SUCCESS_OK,
				message: FAILURE_MESSAGE,
				details: SUCCESS_MESSAGE,
			};
		}

		return { status: SUCCESS_OK, details: SUCCESS_MESSAGE };
	} catch (error: any) {
		console.log("recaptcha", error);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error.response?.data || error.message,
		};
	}
}

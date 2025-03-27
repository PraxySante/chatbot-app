import axios from "axios";
import { ResponseFailureType } from "../../types/chatbot.type";
import { axiosTranscription } from "./axiosTranscription.service";
import {
	BEARER,
	ERROR_SERVER,
	ERROR_SERVER_MESSAGE,
	FAILURE_MESSAGE,
} from "../../constant/constant";
import { TranscriptionType } from "../../types/transcription.type";

export async function startTranscription(
	authToken: string
): Promise<TranscriptionType | ResponseFailureType> {
	try {
		return axiosTranscription.get("/transcribe/start", {
			headers: {
				Authorization: `${BEARER} ${authToken}`,
			},
		});
	} catch (error: unknown) {
		console.error(error);

		if (axios.isAxiosError(error)) {
			return {
				status: error.response?.status || ERROR_SERVER,
				message: FAILURE_MESSAGE,
				details: error.message,
			};
		}

		return {
			status: ERROR_SERVER,
			message: FAILURE_MESSAGE,
			details: ERROR_SERVER_MESSAGE,
		};
	}
}

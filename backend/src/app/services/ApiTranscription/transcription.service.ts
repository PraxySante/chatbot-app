import axios from "axios";
import { ResponseFailureType } from "../../types/chatbot.type";
import { axiosTranscription } from "./axiosTranscription.service";
import {
	BEARER,
	ERROR_SERVER,
	ERROR_SERVER_MESSAGE,
	FAILURE_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { TranscriptionType } from "../../types/transcription.type";

export async function startTranscription(
	authToken: string
): Promise<TranscriptionType | ResponseFailureType> {
	try {
		const responseApi: any = await axiosTranscription.get("/transcribe/start", {
			headers: {
				Authorization: `${BEARER} ${authToken}`,
			},
		});

		if (responseApi.data.status !== SUCCESS_OK) {
			const data = {
				status: responseApi.data.status,
				message: FAILURE_MESSAGE,
				details: responseApi.data.message,
			};
			return data as ResponseFailureType;
		}
		return responseApi.data as TranscriptionType;
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

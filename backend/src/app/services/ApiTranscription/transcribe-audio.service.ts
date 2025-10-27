import axios from "axios";
import { BEARER, ERROR_NOT_AUTHENTIFIED, ERROR_NOT_AUTHENTIFIED_MESSSAGE, ERROR_SERVER, ERROR_SERVER_MESSAGE, FAILURE_MESSAGE, SUCCESS_OK } from "../../constant/constant";
import { ResponseFailureType } from "../../types/chatbot.type";
import { TranscriptionType } from "../../types/transcription.type";
import { axiosTranscription } from "./axiosTranscription.service";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { getKeyRedis } from "../../datamapper/redis.datamapper";

export async function transcribeAudio(
	form:any,
  ip: string,
	uuidSession: string
): Promise<TranscriptionType | ResponseFailureType> {
  const { status, details }: ResponseKeyRedisType | ResponseFailureType =
		await getKeyRedis(`${ip}-${uuidSession}`);

	// Message Error Typed - error message from Redis
	if (status !== SUCCESS_OK && typeof details === "string") {
		return { status: status, details: details };
	}

	// Message Error Typed - check structure auth
	if (typeof details !== "object" || !("authToken" in details)) {
		return {
			status: ERROR_NOT_AUTHENTIFIED,
			details: ERROR_NOT_AUTHENTIFIED_MESSSAGE,
		};
	}

	try {
		const responseApi: any = await axiosTranscription.post(`/transcribe/uuid/${uuidSession}`, {
			headers: {
				Authorization: `${BEARER} ${details.authToken}`,
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

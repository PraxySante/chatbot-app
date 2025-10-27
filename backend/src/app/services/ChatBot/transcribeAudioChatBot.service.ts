import {
	BEARER,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	FAILURE_MESSAGE,
	SUCCESS_OK,
} from "../../constant/constant";
import { getKeyRedis } from "../../datamapper/redis.datamapper";
import { axiosTranscription } from "../ApiTranscription/axiosTranscription.service";
import { ResponseFailureType, ResponseSuccessType } from "../../types/chatbot.type";

export async function transcribeAudioChatBot(
	ip: string,
	uuidSession: string,
	audioBase64: any
) : Promise<ResponseFailureType | ResponseSuccessType> {
	// Convertir Base64 en Buffer
	const audioBuffer = Buffer.from(audioBase64, "base64");

	// Votre logique existante de validation Redis
	const { status, details } = await getKeyRedis(`${ip}-${uuidSession}`);

	if (status !== SUCCESS_OK && typeof details === "string") {
		return { status: status, details: details };
	}

	if (typeof details !== "object" || !("authToken" in details)) {
		return {
			status: ERROR_NOT_AUTHENTIFIED,
			details: ERROR_NOT_AUTHENTIFIED_MESSSAGE,
		};
	}

	// Créer un Blob pour l'API externe (si elle attend multipart)
	const audioBlob = new Blob([audioBuffer], { type: "audio/wav" });
	const form = new FormData();
	form.append("file", audioBlob, "audio.wav");
	form.append("uuidSession", uuidSession);

	try {
		const responseApi = await axiosTranscription.post(
			`/transcribe/uuid/${uuidSession}?token=${details.authToken}&user_uuid=${details.project}&language=${details.language}&dictation_mode=true&medical_specialty=Cardiologist`,
			form,
			{
				headers: {
					Authorization: `${BEARER} ${details.authToken}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return {
			status: responseApi.status,
			details: responseApi.data,
		};
	} catch (error: any) {
		console.error(error.message);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

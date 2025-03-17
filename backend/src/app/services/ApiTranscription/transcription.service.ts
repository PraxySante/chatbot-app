import axios, { AxiosError } from "axios";
import { ResponseFailureType } from "../../types/chatbot.type";
import { axiosTranscription } from "./axiosTranscription.service";

type TranscriptionType = {
	status: number;
	message: string;
	data: {
		uuid: string;
	};
};

export async function startTranscription(
	authToken: string
): Promise<TranscriptionType | ResponseFailureType> {
	try {
		return axiosTranscription.get("/transcribe/start", {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
	} catch (error: unknown) {
		console.error(error);
    
		if (axios.isAxiosError(error)) {
			return { 
				status: error.response?.status || 500, 
				message: "failure", 
				details: error.message 
			};
		}
		
		return { 
			status: 500, 
			message: "failure", 
			details: "Internal Error"
		};
	}
}

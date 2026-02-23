import {
	BEARER,
	ERROR_NOT_AUTHENTIFIED,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	ERROR_SERVER,
	FAILURE_MESSAGE,
	FAILURE_MISSING_URL_DOCUMENT,
	SUCCESS_OK,
} from "../../constant/constant";
import { getKeyRedis } from "../../datamapper/redis.datamapper";
import { ResponseFailureType } from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { axiosChatBot } from "./axiosChatBot.service";
import saveError from "./saveError.service";

export async function getDocument(
	ip: string,
	urlDocument: string,
	uuidSession: string,
) {
	if (!urlDocument) {
		console.error(FAILURE_MISSING_URL_DOCUMENT);
		return { status: ERROR_SERVER, details: FAILURE_MISSING_URL_DOCUMENT };
	}

	const { status, details }: ResponseKeyRedisType | ResponseFailureType =
		await getKeyRedis(`${ip}-${uuidSession}`);

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
		const pdfResponse = await axiosChatBot.get(`${urlDocument}`, {
			headers: {
				Authorization: `${BEARER} ${details?.authToken}`,
			},
			responseType: "arraybuffer",
		});

		return {
			status: pdfResponse.status,
			details: pdfResponse.data,
		};
	} catch (error: any) {
		console.error("getDocument", error);
		await saveError(
			error,
			details,
			"Chatbot_web",
			"Chatbot_conversation",
			"getDocument",
		);
		return {
			status: error.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
	}
}

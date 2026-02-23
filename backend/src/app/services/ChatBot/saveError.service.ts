import { KeyRedisType } from "../../types/redis.type";
import { createConversationDirectus } from "../Directus/create.service";

export default async function saveError(
	error: any,
	details: KeyRedisType,
	fromApp: string,
	fromSection: string,
	action: string,
) {
	try {
		const errorData = {
			From_app: fromApp,
			From_section: fromSection,
			Message_error: {
				baseURL: error.config.baseURL,
				url: error.config.url,
				method: error.config.method,
				data: error.config.data,
				response: {
					status: error.response.status,
					statusText: error.response.statusText,
				},
				user: details,
			},
			Action: action,
		};
		await createConversationDirectus(
			String(process.env.COLLECTION_ERROR),
			errorData,
		);
	} catch (error) {
		console.log("🚀 ~ saveError ~ error:", error);
	}
}

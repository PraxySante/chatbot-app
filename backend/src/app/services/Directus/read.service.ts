import { AxiosResponse } from "axios";
import { ResponseFailureType } from "../../types/chatbot.type";
import { ConversationDirectusAttributes } from "../../types/directus.type";
import { FAILURE_MESSAGE, SUCCESS_OK } from "../../constant/constant";
import axiosDirectusFoch from "./axiosDirectusFoch.service";
import axiosDirectusESC from "./axiosDirectusESC.service";

/**
	 * Request axios Directus - read record by id
	 *
	 * @argument {Argument}
	 * - **Arguments** (`collection, id`):
	 * @param collection 
	 *   - `collection`: env variable directory to collect new conversation 
	 * @param id 
	 *   - `id`: idDirectus conversation recorded
	 * @example
	 * {
	  "colection" : '/welcome_chezSam'
    "id": 'un id Directus',
		}
	 * @returns {Promise<ResponseFailureType | ConversationDirectusAttributes>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @example
	 * Response 200 - Success 
	 		{
			id: 'string';
			Name: 'string';
			Date: 'Date';
			Asked_question: 'MessageType';
			Model_answer: 'string';
			Source_nodes: 'string';
			Satisfaction: 'number';
			Comments: 'string';
			Historic: 'MessageType';
			}
	 * @throws {400} - Missing ip in request headers
	 * @example
	 * {
	 * message: "Failure",
	 * details: "Missing data",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 */
export async function readConversationDirectus(
	project: string,
	id: string,
	collection: string
): Promise<ConversationDirectusAttributes | ResponseFailureType> {
	try {
		let response: AxiosResponse;

		if (project === "Foch") {
			response = await axiosDirectusFoch.get(`/items/${collection}/${id}`);
		} else {
			response = await axiosDirectusESC.get(`/items/${collection}/${id}`);
		}
		const { data, status } = response;

		if (status !== SUCCESS_OK) {
			const data = {
				status: status,
				message: FAILURE_MESSAGE,
				details: response.data.message,
			};
			return data as ResponseFailureType;
		}
		return data.data as ConversationDirectusAttributes;
	} catch (error: any) {
		console.error(error);
		const data = {
			status: error?.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
		return data as ResponseFailureType;
	}
}

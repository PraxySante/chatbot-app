import { AxiosResponse } from "axios";
import { ResponseFailureType } from "../../types/chatbot.type";
import {
	ConversationDirectusAttributes,
	CreateConversationDirectusAttributes,
} from "../../types/directus.type";
import { FAILURE_MESSAGE, SUCCESS_OK } from "../../constant/constant";
import axiosDirectusFoch from "./axiosDirectusFoch.service";
import axiosDirectusESC from "./axiosDirectusESC.service";

/**
	 * Request axios Directus - create record 
	 *
	 * @argument {Argument}
	 * - **Arguments** (`collection, uuidTranscription, project`):
	 * @param collection 
	 *   - `collection`: env variable directory to collect new conversation 
	 * @param project 
	 *   - `project`: project location, locate chatbot
	 * @param uuidTranscription 
	 *   - `uuid`: uuidTranscription used during conversation
	 * @example
	 * {
	  "colection" : '/welcome_chezSam'
    "data":{		
		"project": 'chezSam',
    "uuid": "un long uuid"
		}
		}
	 * @returns {Promise<ResponseFailureType | CreateConversationDirectusAttributes>} - Return response JSON :
	 * - **details**
	 * - **status**
	 * @example
	 * Response 200 - Success 
	 		id: 'string';
			Name: 'string';
			Date: 'Date';
			Asked_question: 'MessageType';
			Model_answer: 'string';
			Source_nodes: 'string';
			Satisfaction: 'number';
			Comments: 'string';
			Historic: 'MessageType';
	 * @throws {400} - Missing ip in request headers
	 * @example
	 * {
	 * message: "Failure",
	 * details: "Missing data",
	 * }
	 * @throws {500} - Internal Server Error - catched by ControllerWrapper
	 */
export async function createConversationDirectus(
	collection: string,
	preparedData: Partial<CreateConversationDirectusAttributes>
): Promise<ConversationDirectusAttributes | ResponseFailureType> {
	try {

		let response: AxiosResponse
		if (preparedData?.Name === 'Foch') {			
			response= await axiosDirectusFoch.post(
			`/items/${collection}`,
			preparedData
		);
		} else {
			response= await axiosDirectusESC.post(
				`/items/${collection}`,
				preparedData
			);
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
		console.error(error.message);
		const data = {
			status: error?.status,
			message: FAILURE_MESSAGE,
			details: error?.message,
		};
		return data as ResponseFailureType;
	}
}

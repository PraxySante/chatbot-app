import { AxiosResponse } from "axios";
import { ResponseFailureType } from "../../types/chatbot.type";
import { CreateDirectusAttributes } from "../../types/directus.type";
import axiosDirectus from "./axiosDirectus.service";
import { FAILURE_MESSAGE, SUCCESS_MESSAGE, SUCCESS_OK } from "../../constant/constant";

/**
	 * Request axios Directus - update record 
	 *
	 * @argument {Argument}
	 * - **Arguments** (`collection, uuidTranscription, project`):
	 * @param collection 
	 *   - `collection`: env variable directory to collect new conversation 
	 * @param id 
	 *   - `id`: idDirectus conversation recorded
	 * @param dataDirectus  
	 *   - `dataDirectus`: Partial dataDirectus to update db
	 	 	id: 'string';
			Name: 'string';
			Date: 'Date';
			Asked_question: 'MessageType';
			Model_answer: 'string';
			Source_nodes: 'string';
			Satisfaction: 'number';
			Comments: 'string';
			Historic: 'MessageType';
	 * @example
	 * {
	  "colection" : '/welcome_chezSam'
    "id": 'un id Directus',
    "data": 
	 	{
			id: 'string';
			Name: 'string';
			Date: 'Date';
			Asked_question: 'MessageType';
			Model_answer: 'string';
			Source_nodes: 'string';
			Satisfaction: 'number';
			Comments: 'string';
			Historic: 'MessageType';}
		}
	 * @returns {Promise<ResponseFailureType | CreateDirectusAttributes>} - Return response JSON :
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
export async function updateConversationDirectus(
	id: string,
	collection: string,
	dataDirectus: Partial<CreateDirectusAttributes>
): Promise<CreateDirectusAttributes | ResponseFailureType> {
	try {
		const response: AxiosResponse = await axiosDirectus.patch(
			`/items/${collection}/${id}`,
			dataDirectus
		);
		const { data, status } = response;
		if (status !== SUCCESS_OK) {
			const data = {
				status: status,
				message: FAILURE_MESSAGE,
				details: response.data.message,
			};
			return data as ResponseFailureType;
		}
		return data as CreateDirectusAttributes;
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

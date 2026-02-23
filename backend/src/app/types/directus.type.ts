import { MessageType } from "./chatbot.type";
import { KeyRedisType } from "./redis.type";

export type CreateConversationDirectusAttributes = {
	Name: string;
	Type: string;
	Uuid_LLM?: string;
	Uuid_Transcription?: string;
};

export type ConversationDirectusAttributes = {
	id: string;
	Name: string;
	Uuid_LLM: string;
	Uuid_Transcription: string;
	Date: Date;
	Asked_question: MessageType;
	Model_answer: string;
	Source_nodes: string[];
	Satisfaction: number;
	Comments: string;
	Historic: MessageType[];
	isTranscription: boolean;
};

export type CallBotDirectusAttributes = {
	Name: string;
	Type: string;
	Statut: string;
	First_name_doctor: string;
	Last_name_doctor: string;
	Calling_number: string;
	First_name_patient: string;
	Last_name_patient: string;
	Date_of_birth: string;
	Historic: MessageType[];
};

export type ResponseErrorAttributes = {
	status: string;
	statusText: string;
};

export type MessageErrorAttributes = {
	baseURL: string;
	url: string;
	method: string;
	data: string;
	response: ResponseErrorAttributes;
	user: KeyRedisType;
};

export type ErrorDirectusAttributes = {
	From_app: string;
	From_section: string;
	Message_error: MessageErrorAttributes;
	Action: string;
};

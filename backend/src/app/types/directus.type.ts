import { MessageType } from "./chatbot.type";

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

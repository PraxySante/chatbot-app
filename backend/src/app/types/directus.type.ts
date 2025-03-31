import { MessageType } from "./chatbot.type";

export type CreateConversationDirectusAttributes = {
	Name: string;
	Uuid_LLM?: string;
	Uuid_Transcription?: string;
}

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

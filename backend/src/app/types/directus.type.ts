import { MessageType } from "./chatbot.type";

export type CreateDirectusAttributes = {
	id: string;
	Name: string;
	Date: Date;
	Asked_question: MessageType;
	Model_answer: string;
	Source_nodes: string[];
	Satisfaction: number;
	Comments: string;
	Historic: MessageType[];
};

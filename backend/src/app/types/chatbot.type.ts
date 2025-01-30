import { AxiosResponse } from "axios";

export type PingType = {
	ping: string;
};

export type ResponsePingType = AxiosResponse<any, any> & {
	ping: string;
};

export type MessageType = {
	role: string;
	content: string;
};

export type SourceType = {
	doc_type: string;
	doc_ref: string;
	doc_name: string;
};

export type ResponseStartEndType = AxiosResponse<any, any> & {
	message: MessageType;
	uuid: string;
};

export type MessageHistoryType = {
	history: MessageType[];
	message: MessageType;
};

export type ResponseMessageType = AxiosResponse<any, any> & {
	message: MessageType;
	details?: string;
	sources: SourceType[];
};

export type ResponseReformulationType = AxiosResponse<any, any> & {
	reformulations: MessageType[];
};

export type ResponseErrorType = AxiosResponse<any, any> & {
	status: number;
	message?: string;
	details: string;
};

export type ResponseFailureType = {
	status: number;
	message?: string;
	details: string;
};

export type ResponseSuccessType = {
	status: number;
	details: string | MessageType[];
	sources?: SourceType[];
};

export type ResponseFeedbackType = AxiosResponse<any, any> & {
	status: number;
	data: {
		message: string;
	}
};



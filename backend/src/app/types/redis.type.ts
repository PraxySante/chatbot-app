export type KeyRedisType = {
	authToken: string;
	token_expires_in: number;
	startTime: number;
	project: string;
	language: string;
	uuid: string;
	idDirectus: string;
};

export type ResponseKeyRedisType = {
	status: number;
	details: KeyRedisType;
};

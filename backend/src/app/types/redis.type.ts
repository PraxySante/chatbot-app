export type KeyRedisType = {
	authToken: string;
	token_expires_in: Date;
	startTime: Date;
	project: string;
	language: string;
	uuid: string;
};

export type ResponseKeyRedisType = {
	status: number;
	details: KeyRedisType;
};

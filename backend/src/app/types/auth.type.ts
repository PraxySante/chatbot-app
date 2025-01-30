export type Auth0M2MType = {
	access_token: string;
	scope: string;
	expires_in: number;
	token_type: string;
};

export type ResponseAuthChatBot = {
	status: number;
	message?: string;
	details: Auth0M2MType;
};

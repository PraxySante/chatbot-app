import axios from "axios";

export const axiosChatBot = axios.create({
	// Configuration axios to connect to ChatBot
	baseURL: process.env.URL_API_BOT,
	headers: { "content-type": "application/json" },
});

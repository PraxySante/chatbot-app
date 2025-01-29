import axios from "axios";

export const axiosAuth0 = axios.create({
	// Configuration axios to connect to Auth0
	baseURL: process.env.AUTH0_URL_REQUEST_TOKEN,
	headers: { "content-type": "application/json" },
});

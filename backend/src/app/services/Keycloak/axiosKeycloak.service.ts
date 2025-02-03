import axios from "axios";

export const axiosKeycloak = axios.create({
	// Configuration axios to connect to Auth0
	baseURL: process.env.KEYCLOAK_URL_REQUEST_TOKEN,
	headers: { "content-type": "application/json" },
});

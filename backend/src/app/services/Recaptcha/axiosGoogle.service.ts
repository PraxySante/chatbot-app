import axios from "axios";

export const axiosGoogle = axios.create({
	// Configuration axios to connect to Google
	baseURL: `${process.env.GOOGLE_URL}`,
	headers: { "Content-type": "application/json" },
});

import { axiosAuth0 } from "./axiosAuth0.service";

export async function connectAuth0() {
	try {
		const response: any = await axiosAuth0.post("", {
			client_id: process.env.AUTH0_CLIENTID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
			audience: process.env.AUTH0_AUDIENCE,
			grant_type: process.env.AUTH0_GRANT_TYPE,
		});
		return response;
	} catch (error:any) {
		console.error(error);
		return { message: "failure", details: error?.message };
	}
}

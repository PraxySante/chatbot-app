import { setKey } from "../../datamapper/redis.datamapper";
import { connectAuth0 } from "./connect.service";

export async function getTokenAndStartChat(
	ip: string,
	project: string,
	language: string
) {
	if (!project || !language) {
		return { message: "failure", details: "Bad request" };
	}

	const response = await connectAuth0();

	let { status, data, details } = response;

	if (details) {
		return { status: 400, message: "failure", details: details };
	}

	if (status === 200) {
		await setKey(
			ip,
			JSON.stringify({
				authToken: data.access_token,
				token_expires_in: Date.now() + data.expires_in,
				startTime: Date.now(),
				project: project,
				language: language,
				uuid: "",
			})
		);
		return {
			status: status,
			details: "Success connection",
		};
	}
}

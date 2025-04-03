import axios from "axios";
import { axiosGoogle } from "./axiosGoogle.service";

export async function verifyUserReCaptchaGoogle(token: string) {

	try {
		const { data } = await axiosGoogle.post('', {
      event: {
        token: token,
        siteKey: process.env.KEY_SITE,
        expectedAction: "LOGIN",
      },
    });
	
    return data
  } catch (error:any) {
    console.error("❌ Erreur reCAPTCHA:", error.response?.data || error.message);
	}
}

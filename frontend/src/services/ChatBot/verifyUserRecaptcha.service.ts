import axiosAuthSecret from "../axiosConfiguration/axiosAuthSecret.service";

export default async function verifyUserRecaptcha(captchaValue:string) {
  try {    
    const responseGoogle = await axiosAuthSecret.post('/verify-user',
      { captchaValue: captchaValue }
    )
    const { data, status } = responseGoogle;
    if (status === 200) {
      return data as any;
    } else {
      return data as any;
    }
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as any;
  }
}
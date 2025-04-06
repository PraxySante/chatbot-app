import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export default async function verifyUserRecaptcha(captchaValue: string) {
  try {
    return await axiosAuthSecret.post('/verify-user', {
      captchaValue: captchaValue,
    });
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as any;
  }
}

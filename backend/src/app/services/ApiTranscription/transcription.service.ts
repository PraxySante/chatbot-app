import { axiosTranscription } from "./axiosTranscription.service";

export async function startTranscription(
  authToken: string
): Promise<any> {
  try {
    return axiosTranscription.get("/transcribe/start", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error:any) {
    console.error(error);
    return { status: error.status, message: error.message };
  }
}


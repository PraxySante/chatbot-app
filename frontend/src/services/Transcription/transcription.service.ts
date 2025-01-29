import axios from 'axios';

export async function startTranscription(authToken: string): Promise<any> {
  try {
    const url =
      process.env.TRANSCRIPTION_BACKEND_ENDPOINT + '/transcribe/start';
    var options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    return axios.request(options);
  } catch (error: any) {
    console.error(error);
    return { status: error.status, message: error.message };
  }
}

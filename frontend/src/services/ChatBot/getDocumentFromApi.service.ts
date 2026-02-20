import { AxiosResponse } from 'axios';
import { ReponseFailureType } from '../../types/chatbot/chatbot.type';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export async function getDocumentFromApi(
  urlDocument: string,
  userLanguage: string
): Promise<any | ReponseFailureType> {
  const payload: {} = {
    urlDocument: urlDocument,
    language: userLanguage,
  };

  try {
    const response: AxiosResponse = await axiosAuthSecret.post(
      '/document',
      payload,
      {
        withCredentials: true,
        responseType: 'blob',
      }
    );
    const blob = response.data;
    return {
      status: response.status,
      details: blob,
    };
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as ReponseFailureType;
  }
}

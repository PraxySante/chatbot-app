import { AxiosResponse } from 'axios';
import { ReponseFailureType } from '../../types/chatbot/chatbot.type';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export async function getDocumentFromApi(
  uuidSession: string,
  urlDocument: string
): Promise<any | ReponseFailureType> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post(
      '/document',
      {
        uuidSession: uuidSession,
        urlDocument: urlDocument,
      },
      {
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

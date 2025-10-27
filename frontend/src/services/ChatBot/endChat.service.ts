import { AxiosResponse } from 'axios';
import {
  ReponseFailureType,
  ResponseStartEndType,
} from '../../types/chatbot/chatbot.type';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export async function endChat(
  uuidSession: string
): Promise<ResponseStartEndType | ReponseFailureType> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post(`/end`, {
      uuidSession: uuidSession,
    });
    const { data, status } = response;
    if (status === 200) {
      return data;
    } else {
      return data as ReponseFailureType;
    }
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as ReponseFailureType;
  }
}

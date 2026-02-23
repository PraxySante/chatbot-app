import { AxiosResponse } from 'axios';
import {
  ReponseFailureType,
  ResponseStartEndType,
} from '../../types/chatbot/chatbot.type';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export async function endChat(
  userLanguage: string
): Promise<ResponseStartEndType | ReponseFailureType> {
  const payload: {} = {
    language: userLanguage,
  };

  try {
    const response: AxiosResponse = await axiosAuthSecret.post(
      `/end`,
      payload,
      { withCredentials: true }
    );
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

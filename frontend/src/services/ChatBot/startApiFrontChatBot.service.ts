import { AxiosResponse } from 'axios';
import {
  MessageType,
  ReponseFailureType,
} from '../../types/chatbot/chatbot.type';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export async function startApiFrontChatBot(
  userLanguage: string
): Promise<MessageType | ReponseFailureType> {
  const payload: {} = {
    language: userLanguage,
  };

  try {
    const response: AxiosResponse = await axiosAuthSecret.post(
      '/start',
      payload,
      { withCredentials: true }
    );
    const { data, status } = response;
    if (status === 200) {
      return data as MessageType;
    } else {
      return data as ReponseFailureType;
    }
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as ReponseFailureType;
  }
}

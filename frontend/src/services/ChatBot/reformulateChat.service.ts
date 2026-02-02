import { AxiosResponse } from 'axios';
import {
  MessageType,
  ReponseFailureType,
} from '../../types/chatbot/chatbot.type';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export async function reformulateChat(
  uuidSession: string,
  userLanguage: string
): Promise<MessageType | ReponseFailureType> {
  const payload: {} = {
    uuidSession: uuidSession,
    language: userLanguage,
  };

  try {
    const response: AxiosResponse = await axiosAuthSecret.post(
      `/reformulate`,
      payload
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

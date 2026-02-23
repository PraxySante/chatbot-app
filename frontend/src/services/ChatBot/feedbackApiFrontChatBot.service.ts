import { AxiosResponse } from 'axios';
import {
  MessageType,
  ReponseFailureType,
} from '../../types/chatbot/chatbot.type';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export async function feedbackApiFrontChatBot(
  vote: number,
  comment: string,
  userLanguage: string
): Promise<MessageType | ReponseFailureType> {
  const payload: {} = {
    note: vote,
    comment: comment || '',
    language: userLanguage,
  };

  try {
    const response: AxiosResponse = await axiosAuthSecret.post(
      `/feedback`,
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
    const data = {
      status: error?.status,
      message: 'failure',
      details: error?.message,
    };
    return data as ReponseFailureType;
  }
}

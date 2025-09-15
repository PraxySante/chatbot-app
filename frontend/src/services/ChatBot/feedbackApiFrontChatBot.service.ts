import { AxiosResponse } from 'axios';
import {
  MessageType,
  ReponseFailureType,
} from '../../types/chatbot/chatbot.type';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';

export async function feedbackApiFrontChatBot(
  vote: number,
  comment: string,
  uuidSession: string
): Promise<MessageType | ReponseFailureType> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post(`/feedback`, {
      note: vote,
      comment: comment || '',
      uuidSession: uuidSession,
    });
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

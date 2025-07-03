import { AxiosResponse } from 'axios';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';
import { ReponseFailureType } from '../../types/chatbot/chatbot.type';

export async function getTokenEloquent(): Promise<string | ReponseFailureType> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post('/token');
    const { data, status } = response;
    if (status === 200) {
      return data.ping as string;
    } else {
      return data as ReponseFailureType;
    }
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as ReponseFailureType;
  }
}

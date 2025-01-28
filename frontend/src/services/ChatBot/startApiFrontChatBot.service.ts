import { AxiosResponse } from "axios";
import { MessageType, ReponseFailureType } from "../../types/chatbot/chatbot.type";
import axiosAuthSecret from "../axiosConfiguration/axiosAuthSecret.service";

export async function startApiFrontChatBot(): Promise<
  MessageType | ReponseFailureType
> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post('/start', {
      project: 'Foch',
      language: 'fr',
    });
    const { data, status } = response;
    console.log('🚀 ~ data, status:', data);
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

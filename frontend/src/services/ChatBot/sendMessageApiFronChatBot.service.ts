import { AxiosResponse } from "axios";
import { MessageType, ReponseFailureType, ResponseMessageType } from "../../types/chatbot/chatbot.type";
import axiosAuthSecret from "../axiosConfiguration/axiosAuthSecret.service";

export async function sendMessageApiFrontChatBot(
  historyMessages: any,
  requestMessageUser: MessageType
): Promise<ResponseMessageType | ReponseFailureType> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post(`/chat`, {
      project: 'Foch',
      language: 'fr',
      history: [...historyMessages],
      message: requestMessageUser,
    });
    const { data, status } = response;
    if (status === 200) {
      return data as ResponseMessageType;
    } else {
      return data as ReponseFailureType;
    }
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as ReponseFailureType;
  }
}
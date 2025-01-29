import { AxiosResponse } from "axios";
import { PingType, ReponseFailureType } from "../../types/chatbot/chatbot.type";
import axiosAuthSecret from "../axiosConfiguration/axiosAuthSecret.service";

// Ping
export async function pingPongChat(): Promise<PingType | ReponseFailureType> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.get('/test');
    const { data, status } = response;
    if (status === 200) {
      return data as PingType;
    } else {
      return data as ReponseFailureType;
    }
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as ReponseFailureType;
  }
}
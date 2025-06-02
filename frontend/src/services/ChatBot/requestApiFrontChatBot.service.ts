import { AxiosResponse } from "axios";
import { ReponseFailureType } from "../../types/chatbot/chatbot.type";
import axiosAuthSecret from "../axiosConfiguration/axiosAuthSecret.service";

export async function requestApiFrontChatBot(): Promise<
  string | ReponseFailureType
> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post('/auth', {});
    const { data, status } = response;
    if (status === 200) {
      return data as string;
    } else {
      return data as ReponseFailureType;
    }
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as ReponseFailureType;
  }
}

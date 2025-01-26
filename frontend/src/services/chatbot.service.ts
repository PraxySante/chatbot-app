import { AxiosResponse } from 'axios';
import axiosAuthSecret from './axiosConfiguration/axiosAuthSecret.service';
import { MessageType, PingType, ReponseFailureType, ResponseMessageType, ResponseStartEndType } from '../types/chatbot/chatbot.type';

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

export async function requestApiFrontChatBot(): Promise<
  string | ReponseFailureType
> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post('/request', {
      project: 'Foch',
      language: 'fr',
    });
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
    console.log("🚀 ~ response:", response)
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

export async function endChat(): Promise<
  ResponseStartEndType | ReponseFailureType
> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post(`/end`, {
       project: 'Foch',
       language: 'fr',
    });
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

export async function reformulateChat(): Promise<
  MessageType | ReponseFailureType
> {
  try {
    const response: AxiosResponse = await axiosAuthSecret.post(`/reformulate`, {
      project: 'Foch',
      language: 'fr',
    });
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

export async function feedbackChat(note: number, comment: string) {
  try {
    const response = await axiosAuthSecret.post(`/feedback`, {
      project: 'Foch',
      language: 'fr',
      note: note,
      comment: comment,
    });
    console.log('🚀 ~ response:', response);
    if (response) {
      return response;
    }
  } catch (error: any) {
    console.error(error.message);
    const data = { message: 'failure', details: error?.message };
    return data as ReponseFailureType;
  }
}

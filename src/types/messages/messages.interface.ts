import { MessageAttributes } from "./messages.type";

export interface IInputMessage {
  //updateMessageInRealTime: (text: string) => void;
  getMessage: (name: string, text: string) => void;
}

export interface IListMessages {
  messages: MessageAttributes[];
  getMessage: (name: string, message: string) => void;
}

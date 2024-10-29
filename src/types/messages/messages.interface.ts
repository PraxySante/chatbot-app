import { Dispatch, SetStateAction } from "react";
import { MessageAttributes } from "./messages.type";

export interface IInputMessage {
  //updateMessageInRealTime: (text: string) => void;
  getMessage: (name: string, text: string) => void;
  setIsBotWritten: Dispatch<SetStateAction<boolean>>
  setIsUserWritten: Dispatch<SetStateAction<boolean>>
}

export interface IListMessages {
  messages: MessageAttributes[];
  getMessage: (name: string, message: string) => void;
}

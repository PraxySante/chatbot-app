import { Dispatch, SetStateAction } from 'react';
import { MessageAttributes } from './messages.type';

export interface IInputMessage {
  setIsBotWritten: Dispatch<SetStateAction<boolean>>;
  setIsUserWritten: Dispatch<SetStateAction<boolean>>;
}

export type ListMessageType = {
  message: MessageAttributes;
};

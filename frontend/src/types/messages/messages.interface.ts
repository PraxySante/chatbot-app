import { Dispatch, SetStateAction } from 'react';

export interface IInputMessage {
  setIsBotWritten: Dispatch<SetStateAction<boolean>>;
  setIsUserWritten: Dispatch<SetStateAction<boolean>>;
}


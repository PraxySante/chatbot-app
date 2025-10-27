import { Dispatch, SetStateAction } from "react";

export type ModalParameterAttributes = {
  menuItem: string;
  isOpen: boolean;
};

export type ModalType = {
  setIsOpenModalFeedback: Dispatch<SetStateAction<boolean>>;
};
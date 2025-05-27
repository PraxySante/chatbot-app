import { Dispatch, SetStateAction } from 'react';
import { ModalParameterAttributes } from './modal.type';

export interface IMenu {
  setIsOpenModalParameter: Dispatch<
    SetStateAction<ModalParameterAttributes | null>
  >;
}

export interface IParameterModal {
  setIsOpenModalParameterItem: ({
    menuItem,
    isOpen,
  }: ModalParameterAttributes) => void;
  isOpenModalParameterItem: ModalParameterAttributes;
}

export interface IModalParameterHeader {
  closeModal: () => void;
}

export interface IModalContent {
  getComment: (e: any) => void;
  onSubmit: () => void;
  comment: string;
}

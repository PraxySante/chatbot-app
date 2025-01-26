import { Dispatch } from "react";
import { ModalParameterAttributes } from "./modal.type";

export interface IMenu {
  setIsOpenModalParameter: Dispatch<
    React.SetStateAction<ModalParameterAttributes| null>
  >;
}

export interface IParameterModal {
  setIsOpenModalParameterItem: ({
    menuItem,
    isOpen,
  }: ModalParameterAttributes) => void;
  isOpenModalParameterItem: ModalParameterAttributes;
}
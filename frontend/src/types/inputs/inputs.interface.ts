import { ReactNode } from 'react';
import { LanguageAttributes } from '../languages/languages.config.type';

export interface IButton {
  type: 'button' | 'submit';
  content: string;
  onClick: (e?: any) => void;
  children?: any;
}

export interface IButtonRadio {
  selectedLanguage: string;
  selectedItem: (selectedLanguage: string) => void;
  language: LanguageAttributes;
  groupName: string;
}

export interface ICheckBox {
  className: string;
  selectedItem: (e?: any) => void;
  groupName: string;
  content: string;
}

export interface IInputEvaluate {
  id: string;
  content: string;
  getDataForm: (value: number) => void;
}

export interface IIconButton {
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  icon: ReactNode;
  onClick?: (e: any) => void;
  content?:string
}

export interface IInput {
  value: string;
  variant: 'text' | 'number' | 'textarea';
  score?: number;
  content?: string;
  className?:string,
  onChange?: (e?: any) => void;
  handleKeyDown?: (e: any) => void;
  isReset?: boolean;
}

export interface ILink {
  children: any;
  id: string;
  className:
    | 'menu-modal-item'
    | 'tab-selected'
    | 'tab'
    | 'tab-procedure'
    | 'tab-procedure_selected';
  name?: string;
  onClick: (menuItem: string) => void;
}

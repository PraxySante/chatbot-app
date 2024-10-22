import { ReactNode } from 'react';
import { LanguageAttributes } from '../languages/languages.config.type';
import { FeedbackAttributes } from '../feedback/feedback.type';

export interface IButton {
  type: 'button' | 'submit';
  content: string;
  onClick: (e?: any) => void;
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
  getDataForm: ({ id, value }: FeedbackAttributes) => void;
}

export interface IIconButton {
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  icon: ReactNode;
  onClick?: (e: any) => void;
}

export interface IInput {
  variant: 'text' | 'number';
  score?: number;
  content?: string;
  onChange?: (e?: any) => void;
}

export interface ILink {
  id: string;
  className: 'menu-modal-item';
  name: string;
  onClick: (menuItem: string) => void;
}

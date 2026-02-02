import { TranslateAttributes } from "./translate.type";

export type LanguageContextAttributes = {
  isSelectLanguage: boolean;
  userLanguage: TranslateAttributes | null;
  selectedLanguage: string;
  setSelectLanguage: (value: string) => void;
};
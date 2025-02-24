import { createContext, ReactNode, useLayoutEffect, useState } from 'react';
import config from '../config/config.json';
import { TranslateAttributes } from '../types/languages/translate.type';
import { LanguageContextAttributes } from '../types/languages/languages.context.type';

const LanguageContext = createContext<LanguageContextAttributes | undefined>(
  undefined
);

function LanguageContextProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    config?.languages[0].id
  );

  const [userLanguage, setUserLanguage] = useState<TranslateAttributes | null>(
    null
  );
  const [isSelectLanguage, setIsSelectLanguage] = useState<boolean>(false);

  useLayoutEffect(() => {
    loadLanguage();
  }, [selectedLanguage]);

  async function loadLanguage(): Promise<void> {
    try {
      const result = await import(
        `../constants/languages/${selectedLanguage}.json`
      );
      setUserLanguage(result);
    } catch (error) {
      console.error(error);
    }
  }

  function selectLanguage(value: string): void {
    setSelectedLanguage(value);
    setIsSelectLanguage(true);
  }

  return (
    <LanguageContext.Provider
      value={{
        isSelectLanguage,
        userLanguage,
        selectedLanguage,
        selectLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContextProvider, LanguageContext };

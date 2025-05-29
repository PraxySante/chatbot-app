import { createContext, useEffect, useState } from 'react';
import { TranslateAttributes } from '../types/languages/translate.type';
import { LanguageContextAttributes } from '../types/languages/languages.context.type';

const LanguageContext = createContext<LanguageContextAttributes | undefined>(
  undefined
);

function LanguageContextProvider({ children, useClient }: any) {
  if (!useClient) {
    throw new Error('ClientContent not found');
  }

  const [selectedLanguage, setSelectedLanguage] = useState<string>('fr');

  const [userLanguage, setUserLanguage] = useState<TranslateAttributes | null>(
    null
  );
  const [isSelectLanguage, setIsSelectLanguage] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      await loadLanguage();
    }
    load();
  }, []);

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

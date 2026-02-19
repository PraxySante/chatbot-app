import { createContext, useEffect, useState } from 'react';
import { TranslateAttributes } from '../types/languages/translate.type';
import { LanguageContextAttributes } from '../types/languages/languages.context.type';
import { AppLanguage } from '../types/languages/languages.config.type';

const LanguageContext = createContext<LanguageContextAttributes | undefined>(
  undefined
);

function LanguageContextProvider({ children, useClient }: any) {
  if (!useClient) {
    throw new Error('ClientContent not found');
  }

  const { configClient } = useClient();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [userLanguage, setUserLanguage] = useState<TranslateAttributes | null>(
    null
  );
  const [isSelectLanguage, setIsSelectLanguage] = useState<boolean>(false);

  useEffect(() => {
    if (configClient) {
      setSelectedLanguage(configClient.languages[0].id as AppLanguage)
    }
  }, [configClient]);

  useEffect(() => {
    async function load() {
      await loadLanguage(selectedLanguage);
    }
    if (selectedLanguage) load();
  }, [selectedLanguage]);

  async function loadLanguage(selectedLanguage: string): Promise<void> {
    try {
      const result = await import(
        `../constants/languages/${selectedLanguage}.json`
      );
      setUserLanguage(result);
    } catch (error) {
      console.error(error);
    }
  }

  function setSelectLanguage(value: string): void {
    setSelectedLanguage(value);
    setIsSelectLanguage(true);
  }

  return (
    <LanguageContext.Provider
      value={{
        isSelectLanguage,
        userLanguage,
        selectedLanguage,
        setSelectLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContextProvider, LanguageContext };

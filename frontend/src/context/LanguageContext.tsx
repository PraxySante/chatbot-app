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

  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const [userLanguage, setUserLanguage] = useState<TranslateAttributes | null>(
    null
  );
  const [isSelectLanguage, setIsSelectLanguage] = useState<boolean>(false);

  useEffect(() => {
    let selectedLanguage = '';

    switch (true) {
      case document.location.hostname.includes(import.meta.env.VITE_HOST_DEV):
        setSelectedLanguage('en');
        selectedLanguage = 'en';
        break;
      case document.location.hostname.includes(import.meta.env.VITE_HOST_CCIB):
        setSelectedLanguage('en');
        selectedLanguage = 'en';
        break;

      default:
        setSelectedLanguage('fr');
        selectedLanguage = 'fr';
        break;
    }

    async function load() {
      await loadLanguage(selectedLanguage);
    }
    load();
  }, []);

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

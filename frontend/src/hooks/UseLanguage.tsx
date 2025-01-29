import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextAttributes } from '../types/languages/languages.context.type';

// Custom Hook to use context
function useLanguage(): LanguageContextAttributes {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('No language found');
  }
  return context;
}

export { useLanguage };

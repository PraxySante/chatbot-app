import { createContext, ReactNode, useState } from 'react';
import verifyUserRecaptcha from '../services/ChatBot/verifyUserRecaptcha.service';

type RecaptchaContextAttributes = {
  isHuman: boolean;
  verifyHuman: (token: string) => void;
};

const RecaptchaContext = createContext<RecaptchaContextAttributes | undefined>(
  undefined
);

function RecaptchaContextProvider({ children }: { children: ReactNode }) {
  const [isHuman, setIsHuman] = useState<boolean>(false);

  async function verifyHuman(tokenHuman: string) {
    const response = await verifyUserRecaptcha(tokenHuman);
    if (!response) {
      setIsHuman(false);
    }

    setIsHuman(true);
  }

  return (
    <RecaptchaContext.Provider value={{ isHuman, verifyHuman }}>
      {children}
    </RecaptchaContext.Provider>
  );
}

export { RecaptchaContextProvider, RecaptchaContext };

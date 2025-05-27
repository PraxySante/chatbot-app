import { createContext, ReactNode, useState } from 'react';
import verifyUserRecaptcha from '../services/ChatBot/verifyUserRecaptcha.service';

type RecaptchaContextAttributes = {
  isHuman: boolean;
  forcingNoRecaptcha: () => void;
  verifyHuman: (
    token: string
  ) => Promise<{ status: number; details: string } | undefined>;
};

const RecaptchaContext = createContext<RecaptchaContextAttributes | undefined>(
  undefined
);

function RecaptchaContextProvider({ children }: { children: ReactNode }) {
  const [isHuman, setIsHuman] = useState<boolean>(false);

  function forcingNoRecaptcha() {
    setIsHuman(true);
  }

  async function verifyHuman(tokenHuman: string) {
    const responseApi = await verifyUserRecaptcha(tokenHuman);
    if (responseApi?.status !== 200) {
      setIsHuman(false);
      return { status: responseApi.status, details: responseApi?.data };
    }
    setIsHuman(true);
    return { status: responseApi.status, details: responseApi?.data };
  }

  return (
    <RecaptchaContext.Provider
      value={{ isHuman, forcingNoRecaptcha, verifyHuman }}
    >
      {children}
    </RecaptchaContext.Provider>
  );
}

export { RecaptchaContextProvider, RecaptchaContext };

import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import SelectLanguage from '../SelectLanguage/SelectLanguage';

import Description from '../../components/Text/Description';
import Title from '../../components/Text/Title';
import { lazy } from 'react';
import { useChat } from '../../hooks/ChatProvider';
import useTranscription from '../../hooks/TranscriptionProvider';
import { useClient } from '../../hooks/ClientProvider';

const Image = lazy(() => import('../../components/Logo/Logo'));

interface IHeaderAttributes {
  toggleOpenCloseModalMenu: () => void;
}

export default function Header({
  toggleOpenCloseModalMenu,
}: IHeaderAttributes) {
  // Init Component

  const { selectedRestart } = useChat();
  const { stopTranscription, isRecord } = useTranscription();
  const { configClient } = useClient();

  function handleClickRestart() {
    selectedRestart();
    isRecord ? stopTranscription() : null;
  }

  return (
    <div id="header">
      {/* Login/Logout selection */}
      {/* {isSelectLanguage ? !isAuthenticated ? <Auth /> : null : null} */}
      {/* Icons */}
      <span className="icons-actions gap-2 items-center left-5 sm:left-10">
        <span className="relative">
          <Image imgSource={configClient.logo} classname="w-14 h-14" />
          {/* <span className="absolute bottom-0 h-4 w-4 rounded-full bg-green-400"></span> */}
        </span>

        <span className="flex flex-col h-fit">
          <Title
            content={configClient.name}
            tag={'h3'}
            className={'sm:text-sm'}
          />
          <Description
            content={'répond généralement immédiatement...'}
            tag={'p'}
            className={'text-xs'}
          />
        </span>
      </span>
      <span className="icons-actions right xs:flex xs:flex-col">
        {configClient.menuParameterOption === true && (
          <>
            <SelectLanguage />
            <IconButton
              onClick={toggleOpenCloseModalMenu}
              icon={icons.menuBar}
            />
          </>
        )}
        <div
          className="flex flex-row gap-2 items-center justify-center border border-secondary rounded-lg p-1 md:p-2 text-blue pointer-cursor hover:bg-secondary hover:text-white"
          onClick={() => handleClickRestart()}
        >
          <IconButton
            aria-label="Redémarrer une nouvelle conversation"
            title="Redémarrer une nouvelle conversation"
            icon={icons.restart}
          />
          <Description
            content={'Redémarrer'}
            tag={'p'}
            className={'text-md hidden md:flex items-center gap-2'}
          />
        </div>
      </span>
    </div>
  );
}

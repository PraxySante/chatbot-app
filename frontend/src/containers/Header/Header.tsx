import IconButton from '../../components/Buttons/IconButton';
import SelectLanguage from '../SelectLanguage/SelectLanguage';

import Description from '../../components/Text/Description';
import Title from '../../components/Text/Title';
import { lazy } from 'react';
import { useChat } from '../../hooks/ChatProvider';
import useTranscription from '../../hooks/TranscriptionProvider';
import { useClient } from '../../hooks/ClientProvider';
import icons from '../../constants/icons';
import { useLanguage } from '../../hooks/UseLanguage';
import './Header.css';

const Image = lazy(() => import('../../components/Logo/Logo'));

interface IHeaderAttributes {
  toggleOpenCloseModalMenu?: () => void;
}

export default function Header({
  toggleOpenCloseModalMenu,
}: IHeaderAttributes) {
  // Init Component

  const { selectedRestart, updateSelectPanel } = useChat();
  const { stopTranscription, isRecord } = useTranscription();
  const { configClient } = useClient();

  function handleClickRestart() {
    selectedRestart();
    isRecord ? stopTranscription() : null;
  }

  const { userLanguage } = useLanguage();

  return (
    <div id="header">
      {/* Login/Logout selection */}
      {/* {isSelectLanguage ? !isAuthenticated ? <Auth /> : null : null} */}
      {/* Icons */}
      <span className="icons-actions header-left-side">
        <span className="hedaer-logo" onClick={() => updateSelectPanel('chat')}>
          <Image
            imgSource={configClient.logo.urlImg}
            classname={`w-${configClient.logo.width} h-${configClient.logo.height} cursor-pointer`}
          />
          {/* <span className="absolute bottom-0 h-4 w-4 rounded-full bg-green-400"></span> */}
        </span>

        <span className="header-chatbot-title">
          <Title
            content={configClient.name}
            tag={'h3'}
            className={'sm:text-sm'}
          />
          <Description
            content={userLanguage ? userLanguage?.chat_time_response : ''}
            tag={'p'}
            className={'text-xs'}
          />
        </span>
      </span>
      <span className="icons-actions right">
        {configClient?.options?.menuParameterOption === true && (
          <>
            <SelectLanguage />
            {configClient?.options?.audioParameterOption && (
              <IconButton
                onClick={toggleOpenCloseModalMenu}
                icon={icons.menuBar}
              />
            )}
          </>
        )}
        <div
          className="header-btn_restart"
          onClick={() => handleClickRestart()}
        >
          <IconButton
            aria-label="Redémarrer une nouvelle conversation"
            title="Redémarrer une nouvelle conversation"
            icon={icons.restart}
          />
          <Description
            content={userLanguage ? userLanguage?.btn_chat_restart : ''}
            tag={'p'}
            className={'text-md hidden md:flex items-center gap-2'}
          />
        </div>
      </span>
    </div>
  );
}

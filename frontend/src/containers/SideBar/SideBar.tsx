import { Suspense, lazy } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Button from '../../components/Buttons/Button';
import SeparateLine from '../../components/SeparateLine/SeparateLine';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useChat } from '../../hooks/ChatProvider';
import Feedback from '../Feedback/Feedback';
import { ISideBar } from '../../types/sidebar/sidebar.interface';
import { useClient } from '../../hooks/ClientProvider';
import './SideBar.css'

const Image = lazy(() => import('../../components/Logo/Logo'));

export default function SideBar({ toggleOpenCloseSideBar }: ISideBar) {
  //Init Component
  // Restart Chat
  const { selectedRestart } = useChat();
  // Check selected language by user
  const { userLanguage } = useLanguage();
  const { configClient } = useClient();

  // Function restart chat
  function restartChat() {
    selectedRestart();
  }

  return (
    <>
      <section id="side-bar">
        {/* Button toggle Open/Close SideBar */}
        <span className="icons-actions right">
          <IconButton onClick={toggleOpenCloseSideBar} icon={icons.arrowLeft} />
        </span>
        {/* Logo */}
        <Suspense fallback={<div>Loading logo...</div>}>
          <Image
            imgSource={configClient.logo.urlImg}
            classname={`w-${configClient.logo.width} h-${configClient.logo.height}`}
          />
        </Suspense>

        {userLanguage && (
          <>
            {/* Button restart */}
            <Button
              content={userLanguage?.chat_restart}
              onClick={restartChat}
              type={'button'}
            />
            <SeparateLine />
            {/* Feedback Form  */}
            <Feedback />
          </>
        )}
      </section>
    </>
  );
}

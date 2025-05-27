import { Suspense, lazy } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Button from '../../components/Buttons/Button';
import SeparateLine from '../../components/SeparateLine/SeparateLine';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useChat } from '../../hooks/ChatProvider';
import Feedback from '../Feedback/Feedback';
import { ISideBar } from '../../types/sidebar/sidebar.interface';

const Image = lazy(() => import('../../components/Logo/Logo'));

export default function SideBar({ toggleOpenCloseSideBar }: ISideBar) {
  //Init Component
  // Restart Chat
  const { selectedRestart } = useChat();
  // Check selected language by user
  const { userLanguage } = useLanguage();

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
        <Suspense fallback={<div>Chargement du logo...</div>}>
          <Image imgSource={import.meta.env.VITE_CHATBOT_LOGO} classname={''} />
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

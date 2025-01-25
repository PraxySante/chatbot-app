import { lazy } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../../hooks/UseLanguage';
import config from '../../config/config.json';
import Button from '../../components/Buttons/Button';
import SeparateLine from '../../components/SeparateLine/SeparateLine';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import StatutLogin from '../StatutLogin/StatutLogin';
import Feedback from '../Feedback/Feedback';
import { useChat } from '../../hooks/ChatProvider';

const Image = lazy(() => import('../../components/Logo/Logo'));

interface ISideBar {
  toggleOpenCloseSideBar: () => void;
}

export default function SideBar({ toggleOpenCloseSideBar }: ISideBar) {
  //Init Component
  // Restart Chat
  const { selectedRestart } = useChat();
  // Check selected language by user
  const { userLanguage, selectedLanguage } = useLanguage();
  // Check user authentified
  const { isAuthenticated } = useAuth0();

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
        {config && <Image imgSource={import.meta.env.VITE_CHATBOT_LOGO} />}
        {selectedLanguage ? (
          <>
            {/* Login Session  */}
            <StatutLogin />
            {userLanguage && isAuthenticated ? (
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
            ) : null}
          </>
        ) : null}
      </section>
    </>
  );
}

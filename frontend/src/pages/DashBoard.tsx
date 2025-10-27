import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../hooks/UseLanguage';
import icons from '../constants/icons';

import Header from '../containers/Header/Header';
import Panel from '../containers/Panel/Panel';
import IconButton from '../components/Buttons/IconButton';
import ModalParameter from '../containers/ModalParameter/ModalParameter';
import SideBar from '../containers/SideBar/SideBar';
import useTranscription from '../hooks/TranscriptionProvider';
import Recaptcha from '../components/Recaptcha/Recaptcha';
import useRecaptcha from '../hooks/RecaptchaProvider';
import { useClient } from '../hooks/ClientProvider';

export default function DashBoard() {
  //Init Component

  // Check status authentification from Auth0
  const { isAuthenticated } = useAuth0();
  // Check language selected
  const { selectedLanguage } = useLanguage();

  const { configClient } = useClient();

  const { isHuman } = useRecaptcha();

  const { isOpenModal } = useTranscription();

  // Check opening sideBar default is true
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

  // Check opening ModalMenu default is false
  const [isOpenModalMenu, setIsOpenModalMenu] = useState<boolean>(false);

  // Function to switch Open/Close SideBar
  function toggleOpenCloseSideBar() {
    setIsOpenSideBar(!isOpenSideBar);
  }

  // Function to switch Open/Close ModalMenu
  function toggleOpenCloseModalMenu() {
    setIsOpenModalMenu(!isOpenModalMenu);
  }

  // Function to switch Open/Close ModalMenu
  function closeModalByClickBackGround() {
    if (isOpenModalMenu) {
      setIsOpenModalMenu(!isOpenModalMenu);
    }
  }

  // Rendering Modal Parameter according user selection
  function renderingModalParameter() {
    return <>{isOpenModal ? <ModalParameter /> : null}</>;
  }

  return (
    <>
      {/* Dashboard section */}
      <div id="dashboard" onClick={closeModalByClickBackGround}>
        {/* Rendering ModalParameter */}
        {configClient.audioParameterOption === true && isOpenModal
          ? renderingModalParameter()
          : null}

        {/* Sidebar section */}
        {/* Button toggle Open/Close SideBar */}
        {configClient.sideBarOption === true ? (
          <>
            {!isOpenSideBar ? (
              <span className="icons-actions left">
                <IconButton
                  onClick={toggleOpenCloseSideBar}
                  icon={icons.arrowRight}
                />
              </span>
            ) : null}
          </>
        ) : null}

        {/*  SideBar */}
        {configClient.sideBarOption === true && isOpenSideBar ? (
          <SideBar toggleOpenCloseSideBar={toggleOpenCloseSideBar} />
        ) : null}

        {/* Main section */}
        <section id="main" className={isOpenSideBar ? 'main-reduce' : ''}>
          {!isHuman ? (
            <span className="absolute h-full w-full z-20 bg-gray-200/50 flex items-center justify-center">
              <Recaptcha />
            </span>
          ) : null}
          {/* Button toggle Open/Close Modal Parameter */}
          {/* Button toggle Open/Close ModalMenu Parameters */}
          {configClient.authAccountOption === true ? (
            <>
              {isAuthenticated && selectedLanguage ? (
                <>
                  {/* Panel */}
                  <Panel />
                </>
              ) : (
                <>
                  {/* Header */}
                  <Header toggleOpenCloseModalMenu={toggleOpenCloseModalMenu} />
                </>
              )}
            </>
          ) : (
            <>
              {/* Header */}
              <Header toggleOpenCloseModalMenu={toggleOpenCloseModalMenu} />
              <hr />

              {/* Panel */}
              <Panel />
            </>
          )}
        </section>
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../hooks/UseLanguage';
import icons from '../constants/icons';

import Header from '../containers/Header/Header';
import TabPanel from '../containers/TabPanel/TabPanel';
import Panel from '../containers/Panel/Panel';
import ModalMenu from '../containers/ModalMenu/ModalMenu';
import IconButton from '../components/Buttons/IconButton';
import ModalParameter from '../containers/ModalParameter/ModalParameter';
import { ModalParameterAttributes } from '../types/modal/modal.type';
import SelectLanguage from '../containers/SelectLanguage/SelectLanguage';
import SideBar from '../containers/SideBar/SideBar';
import Button from '../components/Buttons/Button';
import { useChat } from '../hooks/ChatProvider';

export default function DashBoard() {
  //Init Component
  // Restart Chat
  const { selectedRestart } = useChat();
  // Check status authentification from Auth0
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  // Check language selected
  const { userLanguage, selectedLanguage } = useLanguage();

  // Check opening sideBar default is true
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

  // Check opening ModalMenu default is false
  const [isOpenModalMenu, setIsOpenModalMenu] = useState<boolean>(false);
  // Check opening ModalParameter default is false
  const [isOpenModalParameter, setIsOpenModalParameter] =
    useState<ModalParameterAttributes | null>(null);

  // Selected Panel default 'chat'
  const [selectedPanel, setSelectedPanel] = useState<string>('chat');

  // Hook to render ModalParameter according user selection
  useEffect(() => {
    renderingModalParameter;
  }, [setIsOpenModalParameter]);

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

  // Function restart chat
  function restartChat() {
    selectedRestart();
  }

  // Rendering Modal Parameter according user selection
  function renderingModalParameter() {

    return (
      <>
        {/* Modal Parameter */}
        {isOpenModalParameter && isOpenModalParameter.isOpen && (
          <ModalParameter
            setIsOpenModalParameterItem={setIsOpenModalParameter}
            isOpenModalParameterItem={isOpenModalParameter}
          />
        )}
      </>
    );
  }

  return (
    <>
      {/* Dashboard section */}
      <div id="dashboard" onClick={closeModalByClickBackGround}>
        {/* Rendering ModalParameter */}
        {import.meta.env.VITE_OPT_MENU_PARAMETERS === 'true' &&
          renderingModalParameter()}

        {/* Sidebar section */}
        {/* Button toggle Open/Close SideBar */}
        {import.meta.env.VITE_OPT_SIDEBAR === 'true' ? (
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

        {/* Icons */}
        <span className="icons-actions right">
          <SelectLanguage />

          {import.meta.env.VITE_OPT_MENU_PARAMETERS === 'true' && (
            <>
              <IconButton
                onClick={toggleOpenCloseModalMenu}
                icon={icons.menuBar}
              />
              {isOpenModalMenu ? (
                <ModalMenu setIsOpenModalParameter={setIsOpenModalParameter} />
              ) : null}
            </>
          )}
        </span>

        {/*  SideBar */}
        {import.meta.env.VITE_OPT_SIDEBAR === 'true' && isOpenSideBar ? (
          <SideBar toggleOpenCloseSideBar={toggleOpenCloseSideBar} />
        ) : null}

        {/* Main section */}
        <section id="main" className={isOpenSideBar ? 'main-reduce' : ''}>
          {/* Button toggle Open/Close Modal Parameter */}
          {/* Button toggle Open/Close ModalMenu Parameters */}
          
          {import.meta.env.VITE_OPT_AUT0_ACCOUNT === 'true' ? (
            <>
              {isAuthenticated && selectedLanguage ? (
                <>
                  {/* Tab Panel */}
                  <TabPanel
                    selectedPanel={selectedPanel}
                    setSelectedPanel={setSelectedPanel}
                  />
                  {/* Panel */}
                  <Panel selectedPanel={selectedPanel} />
                </>
              ) : (
                <>
                  {/* Header */}
                  <Header />
                </>
              )}
            </>
          ) : (
            <>
              {/* Tab Panel */}
              <TabPanel
                selectedPanel={selectedPanel}
                setSelectedPanel={setSelectedPanel}
              />
              {/* Panel */}
              <Panel selectedPanel={selectedPanel} />
            </>
          )}
        </section>
      </div>
    </>
  );
}

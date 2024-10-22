import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../hooks/UseLanguage';
import icons from '../constants/icons';

import Header from '../containers/Header/Header';
import SideBar from '../containers/SideBar/SideBar';
import TabPanel from '../containers/TabPanel/TabPanel';
import Panel from '../containers/Panel/Panel';
import ModalMenu from '../containers/ModalMenu/ModalMenu';
import IconButton from '../components/Buttons/IconButton';
import ModalParameter from '../containers/ModalParameter/ModalParameter';

type ModalParameterAttributes = {
  menuItem: string;
  isOpen: boolean;
};

export default function DashBoard() {
  // Check status authentification from Auth0
  const { isAuthenticated } = useAuth0();
  // Check language selected
  const { selectedLanguage } = useLanguage();

  // Check opening sideBar default is true
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);

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
      <div id="dashboard">
        {/* Rendering ModalParameter */}
        {renderingModalParameter()}
        {/* Sidebar section */}
        {/* Button toggle Open/Close SideBar */}
        {!isOpenSideBar && (
          <span className="icons-actions left">
            <IconButton
              onClick={toggleOpenCloseSideBar}
              icon={icons.arrowRight}
            />
          </span>
        )}
        {/*  SideBar */}
        {isOpenSideBar && (
          <SideBar toggleOpenCloseSideBar={toggleOpenCloseSideBar} />
        )}

        {/* Main section */}
        <section id="main">
          {/* Button toggle Open/Close Modal Parameter */}
          <span className="icons-actions right">
            <IconButton
              onClick={toggleOpenCloseModalMenu}
              icon={icons.menuBar}
            />
          </span>

          {/* Button toggle Open/Close ModalMenu Parameters */}
          {isOpenModalMenu ? (
            <ModalMenu setIsOpenModalParameter={setIsOpenModalParameter} />
          ) : null}
          {/* Header */}
          <Header />

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
          ) : null}
        </section>
      </div>
    </>
  );
}

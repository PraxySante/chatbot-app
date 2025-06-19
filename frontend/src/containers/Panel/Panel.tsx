import { useEffect, useState } from 'react';
import Chat from '../Chat/Chat';
import Procedures from '../Procedures/Procedures';
import { selectedPanelAttributes } from '../../types/panel/panel.type';
import { PANEL_CHAT, PANEL_PROCEDURE } from '../../constants/notifications.constants';
import Frame from '../Frame/Frame';

export default function Panel() {
  const [selectedPanel, setSelectedPanel] = useState<selectedPanelAttributes>(PANEL_CHAT);

  // Hook to render Panel according user selection
  useEffect(() => {
    renderPanel();
  }, [selectedPanel]);

  // Function render Panel selected
  function renderPanel() {
    switch (selectedPanel) {
      case PANEL_CHAT:
        return (
          <Chat
            selectedPanel={selectedPanel}
            setSelectedPanel={setSelectedPanel}
          />
        );
      case PANEL_PROCEDURE:
        return (
          <Procedures
            selectedPanel={selectedPanel}
            setSelectedPanel={setSelectedPanel}
          />
        );
      case 'chat-ext':
        return (
          <Frame/>
        )
      default:
        break;
    }
  }

  return <>{renderPanel()}</>;
}

import { useEffect } from 'react';
import Chat from '../Chat/Chat';
import Procedures from '../Procedures/Procedures';
import {
  PANEL_CHAT,
  PANEL_PROCEDURE,
} from '../../constants/notifications.constants';
import { useChat } from '../../hooks/ChatProvider';

export default function Panel() {
  const { selectedPanel } = useChat();

  // Hook to render Panel according user selection
  useEffect(() => {
    renderPanel();
  }, [selectedPanel]);

  // Function render Panel selected
  function renderPanel() {
    switch (selectedPanel) {
      case PANEL_CHAT:
        return <Chat />;
      case PANEL_PROCEDURE:
        return <Procedures />;
      default:
        break;
    }
  }

  return <>{renderPanel()}</>;
}

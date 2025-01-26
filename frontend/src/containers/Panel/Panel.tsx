import { useEffect } from 'react';
import { PanelAttributes } from '../../types/panel/panel.type';
import Chat from '../Chat/Chat';
import Procedures from '../Procedures/Procedures';

export default function Panel({ selectedPanel }: PanelAttributes) {
  // Hook to render Panel according user selection
  useEffect(() => {
    renderPanel();
  }, [selectedPanel]);

  // Function render Panel selected
  function renderPanel() {
    switch (selectedPanel) {
      case 'chat':
        return <Chat />;
      case 'procedure':
        return <Procedures />;
      default:
        break;
    }
  }

  return <>{renderPanel()}</>;
}

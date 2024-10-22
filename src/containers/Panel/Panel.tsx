import { PanelAttributes } from '../../types/panel/panel.type';
import Chat from '../Chat/Chat';
import Procedures from '../Procedures/Procedures';

export default function Panel({ selectedPanel }: PanelAttributes) {
  // Function render Panel selected
  function renderPanel() {
    switch (selectedPanel) {
      case 'chat':
        return <Chat />;
      case 'procedures':
        return <Procedures />;
      default:
        break;
    }
  }

  return <>{renderPanel()}</>;
}

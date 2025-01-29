import { useEffect, useState } from 'react';
import Chat from '../Chat/Chat';
import Procedures from '../Procedures/Procedures';

export default function Panel() {
  const [selectedPanel, setSelectedPanel] = useState<'chat'|'procedure'>('chat');

  // Hook to render Panel according user selection
  useEffect(() => {
    renderPanel();
  }, [selectedPanel]);

  // Function render Panel selected
  function renderPanel() {
    switch (selectedPanel) {
      case 'chat':
        return (
          <Chat
            selectedPanel={selectedPanel}
            setSelectedPanel={setSelectedPanel}
          />
        );
      case 'procedure':
        return (
          <Procedures
            selectedPanel={selectedPanel}
            setSelectedPanel={setSelectedPanel}
          />
        );
      default:
        break;
    }
  }

  return <>{renderPanel()}</>;
}

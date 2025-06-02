import { useEffect } from 'react';
import Title from '../../components/Text/Title';
import Information from '../Information/Information';
import Notification from '../Notification/Notification';
import TabPanel from '../TabPanel/TabPanel';
import { useNotification } from '../../hooks/NotificationProvider';
import { IChatAttributes } from '../../types/chatbot/chatbot.interface';
import { useClient } from '../../hooks/ClientProvider';

export default function HeaderChat({
  selectedPanel,
  setSelectedPanel,
}: IChatAttributes) {
  const { messageNotification } = useNotification();

  const { configClient } = useClient();

  useEffect(() => {
    renderingNotification();
  }, [messageNotification]);

  function renderingNotification() {
    setTimeout(() => {
      return <Notification />;
    }, 100);
  }

  return (
    <section className="h-fit">
      {/* Data Inofrmation chat */}
      <Title content={configClient.title} tag={'h1'} className={''}></Title>
      <Information />
      <div className="chat-room-containers_tab-panel">
        <TabPanel
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
        />
        {messageNotification && <Notification />}
      </div>
    </section>
  );
}

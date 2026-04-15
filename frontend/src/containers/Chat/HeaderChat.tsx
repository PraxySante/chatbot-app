import { useEffect } from 'react';
import Title from '../../components/Text/Title';
import Information from '../Information/Information';
import Notification from '../Notification/Notification';
import TabPanel from '../Panel/TabPanel/TabPanel';
import { useNotification } from '../../hooks/NotificationProvider';
import { useClient } from '../../hooks/ClientProvider';
import { useLanguage } from '../../hooks/UseLanguage';
import './Chat.css';

export default function HeaderChat() {
  const { messageNotification } = useNotification();

  const { configClient } = useClient();
  const { userLanguage } = useLanguage();

  useEffect(() => {
    renderingNotification();
  }, [messageNotification?.message]);

  function renderingNotification() {
    setTimeout(() => {
      return <Notification />;
    }, 100);
  }

  return (
    <section className="chat-room-header">
      {/* Data Inofrmation chat */}
      <Title
        content={`${userLanguage?.chat_title} ${configClient.title}`}
        tag={'h1'}
        className={''}
      ></Title>
      <Information />
      <div className="chat-room-containers_tab-panel">
        <TabPanel />
        {messageNotification?.message && <Notification />}
      </div>
    </section>
  );
}

import { tabPanelAttributes } from '../../../types/panel/tab.type';
import { useLanguage } from '../../../hooks/UseLanguage';
import { Fragment } from 'react/jsx-runtime';
import icons from '../../../constants/icons';
import IconButton from '../../../components/Buttons/IconButton';
import { useChat } from '../../../hooks/ChatProvider';
import '../Panel.css';

export default function TabPanel() {
  //Init Component
  // Check selected language by user
  const { userLanguage } = useLanguage();
  const { selectedPanel, updateSelectPanel } = useChat();
  // Init Tab Panel structure
  const tabPanel: tabPanelAttributes[] = [
    {
      id: 'chat',
      name: 'Chat',
      icon: icons.chat,
    },
    {
      id: 'procedure',
      name: userLanguage ? userLanguage?.procedure_visualize : '',
      icon: icons.procedure,
    },
  ];

  return (
    <div id="tab-panel">
      {/* Rendering Tab Panel */}
      {tabPanel.map((tab: tabPanelAttributes, index: number) => {
        return (
          <Fragment key={index}>
            <IconButton
              type="button"
              icon={tab.icon}
              className={selectedPanel === tab.id ? 'tab-selected' : 'tab'}
              onClick={() => updateSelectPanel(tab.id)}
              content={tab.name}
              title={tab.name}
            />
            {/* <Link
              id={tab.id}
              className={selectedPanel === tab.id ? 'tab-selected' : 'tab'}
              name={tab.name}
              onClick={() => setSelectedPanel(tab.id)}
            >
              {tab.icon}
              {tab.name}
            </Link> */}
          </Fragment>
        );
      })}
    </div>
  );
}

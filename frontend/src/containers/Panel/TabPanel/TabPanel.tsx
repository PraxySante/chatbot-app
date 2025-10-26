import { tabPanelAttributes } from '../../../types/panel/tab.type';
import { useLanguage } from '../../../hooks/UseLanguage';
import { IPanel } from '../../../types/panel/panel.interface';
import { Fragment } from 'react/jsx-runtime';
import icons from '../../../constants/icons';
import IconButton from '../../../components/Buttons/IconButton';

export default function TabPanel({ selectedPanel, setSelectedPanel }: IPanel) {
  //Init Component
  // Check selected language by user
  const { userLanguage } = useLanguage();
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
              onClick={() => setSelectedPanel(tab.id)}
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

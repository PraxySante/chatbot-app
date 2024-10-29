import { tabPanelAttributes } from '../../types/panel/tab.type';
import { useLanguage } from '../../hooks/UseLanguage';
import { IPanel } from '../../types/panel/panel.interface';
import Link from '../../components/Link/Link';
import { Fragment } from 'react/jsx-runtime';

export default function TabPanel({ selectedPanel, setSelectedPanel }: IPanel) {
  //Init Component
  // Check selected language by user
  const { userLanguage } = useLanguage();
  // Init Tab Panel structure
  const tabPanel: tabPanelAttributes[] = [
    {
      id: 'chat',
      name: 'Chat',
    },
    {
      id: 'procedure',
      name: userLanguage ? userLanguage?.procedure_visualize : '',
    },
  ];

  return (
    <div id="tab-panel">
      {/* Rendering Tab Panel */}
      {tabPanel.map((tab: tabPanelAttributes, index: number) => {
        return (
          <Fragment key={index}>
            <Link
              id={tab.id}
              className={selectedPanel === tab.id ? 'tab-selected' : 'tab'}
              name={tab.name}
              onClick={() => setSelectedPanel(tab.id)}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

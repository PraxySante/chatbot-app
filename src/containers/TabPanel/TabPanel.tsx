import { tabPanelAttributes } from '../../types/panel/tab.type';
import { useLanguage } from '../../hooks/UseLanguage';
import { IPanel } from '../../types/panel/panel.interface';

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
          <a
            onClick={() => setSelectedPanel(tab.id)}
            className={selectedPanel === tab.id ? 'tab-selected' : 'tab'}
            key={index}
          >
            {tab.name}
          </a>
        );
      })}
    </div>
  );
}

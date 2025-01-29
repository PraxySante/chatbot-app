export interface IPanel {
  selectedPanel: 'chat' | 'procedure';
  setSelectedPanel: (id: 'chat' | 'procedure') => void;
}
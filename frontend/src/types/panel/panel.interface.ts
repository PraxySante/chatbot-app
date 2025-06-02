import { selectedPanelAttributes } from "./panel.type";

export interface IPanel {
  selectedPanel: selectedPanelAttributes;
  setSelectedPanel: (id: selectedPanelAttributes) => void;
}
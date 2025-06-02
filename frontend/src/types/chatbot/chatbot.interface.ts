import { Dispatch, SetStateAction } from 'react';
import { selectedPanelAttributes } from '../panel/panel.type';

export interface IChatAttributes {
  selectedPanel: selectedPanelAttributes;
  setSelectedPanel: Dispatch<SetStateAction<selectedPanelAttributes>>;
}

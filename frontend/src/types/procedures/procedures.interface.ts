import { Dispatch, SetStateAction } from 'react';
import { selectedPanelAttributes } from '../panel/panel.type';

export interface IProcedureAttributes {
  selectedPanel: selectedPanelAttributes;
  setSelectedPanel: Dispatch<SetStateAction<selectedPanelAttributes>>;
}

export interface ITabProceduresAttributes {
  selectedProcedure: number;
  SetSelectedProcedure: Dispatch<SetStateAction<number>>;
}
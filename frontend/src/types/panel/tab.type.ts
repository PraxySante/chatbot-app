import { ReactNode } from "react";

export type tabPanelAttributes = {
  id: 'chat' | 'procedure';
  name: string;
  icon: ReactNode
};
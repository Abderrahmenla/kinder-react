import { SerializedStyles } from '@emotion/react';

export interface TabObj {
  label: string;
  isActive: boolean;
  name: string;
}

export interface TabsProps {
  tabOptions: TabObj[];
  tabOnclickHandler: (tabName: string) => void;
  className?: string;
  buttonStyle?: SerializedStyles;
}

import { SerializedStyles } from '@emotion/react';

export interface TableDataProps {
  children?: React.ReactNode;
  dataStyles?: SerializedStyles;
  rowspan?: number;
  colspan?: number;
  className?: string;
  onClick?: () => void;
}

export interface TableRowProps {
  children?: React.ReactNode;
  invertedBackground?: boolean;
  dataStyles?: SerializedStyles;
}

export interface TableHeaderProps {
  children?: React.ReactNode;
  headerStyles?: SerializedStyles;
  className?: string;
}

export interface TableBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export interface TableParentProps {
  children?: React.ReactNode;
  cellSpacing?: number;
  className?: string;
}

export interface TableProps {
  children?: React.ReactNode;
  className?: string;
  showPadding?: boolean;
  mediaQueryPadding?: string;
}

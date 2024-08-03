import { SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';

export interface DataProps {
  label?: string;
  value?: string | null;
  dataStyles?: SerializedStyles | undefined;
  actionButton?: ReactNode;
}

export interface RowData {
  rowStyles?: SerializedStyles | undefined;
  rowData: DataProps[];
}

export interface ResponsiveTableProps {
  isMobile: boolean;
  isLoading: boolean;
  loadingWrapper: ReactNode;
  count: number;
  setCurrentPage?: (page: number) => void;
  headers: string[];
  rows: RowData[];
  headerStyles?: SerializedStyles | undefined;
  customCard?: ReactNode;
}

export interface DesktopTableProps {
  headers: string[];
  rows: RowData[];
  headerStyles?: SerializedStyles | undefined;
}

export interface DataTextProps {
  dataStyles?: SerializedStyles;
}

export interface MobileCardsProps {
  rows: RowData[];
}

export interface CustomPaginationProps {
  isMobile: boolean;
  count: number;
  setCurrentPage: (page: number) => void;
}

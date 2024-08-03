export interface PageOptionProps {
  isActive: boolean;
}

export interface PaginationProps {
  pages: number;
  onClick: (pageNumber: number) => void;
  className?: string;
}

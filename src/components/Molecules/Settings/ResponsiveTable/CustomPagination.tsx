import { useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { CustomPaginationProps } from './ResponsiveTable.types';
import { Spacer, StyledPagination } from './ResponsiveTable.styles';

const CustomPagination: React.FC<CustomPaginationProps> = ({ isMobile, count, setCurrentPage }) => {
  const { currentPage, pages, showPagination, handleSetPages, handlePageClick } = usePagination({
    isMobile
  });

  useEffect(() => {
    handleSetPages(count);
  }, [count]);

  useEffect(() => {
    setCurrentPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (!showPagination) return null;

  return (
    <>
      <Spacer isMobile={isMobile} />
      <StyledPagination pages={pages} onClick={handlePageClick} isMobile={isMobile} />
    </>
  );
};

export default CustomPagination;

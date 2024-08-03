import { useCallback, useEffect, useMemo, useState } from 'react';

export const DESKTOP_ITEMS_PER_PAGE = 25;
export const MOBILE_ITEMS_PER_PAGE = 3;

export interface UsePaginationProps {
  selectedTab?: string;
  isMobile?: boolean;
}

export const usePagination = ({ selectedTab, isMobile = true }: UsePaginationProps = {}) => {
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setCurrentPage(1), [selectedTab]);

  const itemsPerPage = useMemo(
    () => (isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE),
    [isMobile]
  );
  const handleSetPages = useCallback(
    (pageCount: number) => setTotalCount(pageCount),
    [setTotalCount]
  );
  const handlePageClick = useCallback((page: number) => setCurrentPage(page), [setCurrentPage]);

  const pages = useMemo(() => Math.ceil(totalCount / itemsPerPage), [totalCount, itemsPerPage]);
  const showPagination = useMemo(() => totalCount > itemsPerPage, [totalCount, itemsPerPage]);

  return { currentPage, setCurrentPage, pages, showPagination, handleSetPages, handlePageClick };
};

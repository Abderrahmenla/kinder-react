import { useState } from 'react';
import {
  NextArrow,
  PageIndex,
  PaginationContainer,
  PaginationOption,
  PrevArrow
} from './Pagination.style';
import { PaginationProps } from './Pagination.type';
import { assets } from '@/config/assets';
import Image from 'next/image';

function getPages(initialValue: number, ceilingValue: number) {
  const returnArray = [];
  for (let number = initialValue; number <= ceilingValue; number++) {
    returnArray.push(number);
  }
  return returnArray;
}

const Pagination: React.FC<PaginationProps> = ({ pages, onClick, className }) => {
  const initialVisiblePages = pages >= 3 ? [1, 2, 3] : getPages(1, pages);

  const [visiblePages, setVisiblePages] = useState<number[]>(initialVisiblePages); // Initial visible page numbers
  const [currentPage, setCurrentPage] = useState(1); // Initial page

  const selectPage = (pageNumber: number) => {
    const validPageNumber = Math.min(Math.max(1, pageNumber), pages);

    let tempVisiblePages = [];
    if (validPageNumber === 1) {
      tempVisiblePages = getPages(validPageNumber, Math.min(validPageNumber + 2, pages));
    } else if (validPageNumber === pages) {
      tempVisiblePages =
        pages > 2 ? getPages(validPageNumber - 2, validPageNumber) : getPages(1, pages);
    } else {
      tempVisiblePages.push(validPageNumber - 1);
      tempVisiblePages.push(validPageNumber);
      tempVisiblePages.push(validPageNumber + 1);
    }

    setVisiblePages(tempVisiblePages);
    setCurrentPage(validPageNumber);
    onClick(validPageNumber);
  };

  return (
    <PaginationContainer className={`pagination-container ${className}`}>
      <PrevArrow className="pagination-previous-button" onClick={() => selectPage(currentPage - 1)}>
        <Image
          src={`${assets}/images/chevron-left-icon.svg`}
          width={10}
          height={10}
          alt="chevron-left-icon"
        />
      </PrevArrow>
      <PageIndex className="pagination-pages-container">
        {visiblePages?.map((pageNumber) => (
          <PaginationOption
            className="pagination-page-button"
            key={`page_${pageNumber}`}
            isActive={pageNumber === currentPage}
            onClick={() => selectPage(pageNumber)}
          >
            {pageNumber}
          </PaginationOption>
        ))}
      </PageIndex>
      <NextArrow onClick={() => selectPage(currentPage + 1)}>
        <Image
          src={`${assets}/images/chevron-right-icon.svg`}
          width={20}
          height={20}
          alt="chevron-right-icon"
        />
      </NextArrow>
    </PaginationContainer>
  );
};

export default Pagination;

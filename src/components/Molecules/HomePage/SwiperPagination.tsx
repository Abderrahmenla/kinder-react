import { styled } from '@mui/material/styles';
import React, { FC } from 'react';
import { Swiper as SwiperClass } from 'swiper';

interface PaginationButtonProps {
  active: boolean;
}

const PaginationButton = styled('div')<PaginationButtonProps>(({ active }) => ({
  backgroundColor: active ? '#9d81ea' : '#4e397d',
  borderRadius: '9px',
  height: '6px',
  width: '34px',
  marginRight: '10px',
  cursor: 'pointer'
}));

const PaginationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '18px'
});

interface SwiperPaginationProps {
  swiper: SwiperClass | null;
  videoSources: string[];
  activeIndex: number;
  handlePaginationClick: (index: number) => void;
}

export const SwiperPagination: FC<SwiperPaginationProps> = ({
  swiper,
  videoSources,
  activeIndex,
  handlePaginationClick
}) => (
  <PaginationContainer>
    {swiper &&
      Array.from({ length: videoSources.length }, (_, index) => (
        <PaginationButton
          role="button"
          data-testid={
            index === activeIndex ? 'active-pagination-button' : `pagination-button-${index}`
          }
          active={index === activeIndex}
          key={index}
          onClick={() => handlePaginationClick(index)}
        />
      ))}
  </PaginationContainer>
);

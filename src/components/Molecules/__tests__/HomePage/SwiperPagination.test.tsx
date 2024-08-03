import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SwiperPagination } from '../../HomePage/SwiperPagination';
import { Swiper as SwiperClass } from 'swiper';

const mockSwiper: SwiperClass | null = {
  slideTo: jest.fn()
} as unknown as SwiperClass;

const videoSources = ['video-source-1.mp4', 'video-source-2.mp4', 'video-source-3.mp4'];

describe('SwiperPagination', () => {
  it('should render SwiperPagination with the correct number of PaginationButtons', () => {
    render(
      <SwiperPagination
        swiper={mockSwiper}
        videoSources={videoSources}
        activeIndex={0}
        /* eslint-disable @typescript-eslint/no-empty-function */
        handlePaginationClick={() => {}}
      />
    );

    const paginationButtons = screen.getAllByRole('button');
    expect(paginationButtons.length).toBe(videoSources.length);
  });

  it('should set the active class on the correct PaginationButton', () => {
    render(
      <SwiperPagination
        swiper={mockSwiper}
        videoSources={videoSources}
        activeIndex={1}
        /* eslint-disable @typescript-eslint/no-empty-function */
        handlePaginationClick={() => {}}
      />
    );

    const activePaginationButton = screen.getByTestId('active-pagination-button');
    expect(activePaginationButton).toBeInTheDocument();
  });

  it('should call handlePaginationClick with the correct index when a PaginationButton is clicked', () => {
    const handlePaginationClick = jest.fn();
    render(
      <SwiperPagination
        swiper={mockSwiper}
        videoSources={videoSources}
        activeIndex={0}
        handlePaginationClick={handlePaginationClick}
      />
    );

    const paginationButton = screen.getByTestId('pagination-button-2');
    fireEvent.click(paginationButton);
    expect(handlePaginationClick).toHaveBeenCalledWith(2);
  });
});

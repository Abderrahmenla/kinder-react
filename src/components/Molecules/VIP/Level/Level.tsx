import React, { useState } from 'react';
import { TitlesContainer, VipLevelTitle } from './Level.style';
import { Swiper, SwiperSlide } from 'swiper/react';

export const VipLevelTitles: React.FC<{
  onTitleClick: (title: string) => void;
  VIPLevelTitles: string[];
}> = ({ onTitleClick, VIPLevelTitles }) => {
  const [activeTitle, setActiveTitle] = useState<string>('All');

  const swiperProps = {
    spaceBetween: 0,
    draggable: true,
    slidesPerView: 4.3,
    breakpoints: {
      640: {
        slidesPerView: 4.5
      },
      768: {
        slidesPerView: 7.3
      },
      1024: {
        slidesPerView: 10.3,
        spaceBetween: 10
      }
    }
  };

  return (
    <TitlesContainer>
      <Swiper {...swiperProps}>
        {VIPLevelTitles.map((title, index) => (
          <SwiperSlide key={index}>
            <VipLevelTitle
              key={title}
              onClick={() => {
                setActiveTitle(title);
                onTitleClick(title);
              }}
              isActive={title === activeTitle}
            >
              {title}
            </VipLevelTitle>
          </SwiperSlide>
        ))}
      </Swiper>
    </TitlesContainer>
  );
};

import React from 'react';
import { StepsContainer, Step as StyledStep } from './Steps.style';
import { Step as StepType } from '@/graphql/types/vipProgramsTypes';
import { assets } from '@/config/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from '@mui/material';

interface StepsProps {
  data: StepType[];
}

const swiperProps = {
  spaceBetween: 12,
  draggable: true,
  slidesPerView: 2.5,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 8
    }
  }
};

export const Steps: React.FC<StepsProps> = ({ data }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <StepsContainer>
      {isMobile ? (
        <Swiper {...swiperProps}>
          {data.map((step, index) => (
            <SwiperSlide key={index}>
              <StyledStep
                bg={step.Image.data?.attributes.url}
                hoverIcon={`${assets}/images/steps/` + step?.Text?.toLowerCase() + '.svg'}
              >
                <span>{step.Title}</span> / <strong>{step.Text}</strong>
              </StyledStep>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Rendering for non-mobile devices
        data.map((step, index) => (
          <StyledStep
            key={index}
            bg={step.Image.data?.attributes.url}
            hoverIcon={`${assets}/images/steps/` + step?.Text?.toLowerCase() + '.svg'}
          >
            <span>{step.Title}</span> / <strong>{step.Text}</strong>
          </StyledStep>
        ))
      )}
    </StepsContainer>
  );
};

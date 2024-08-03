import styled from '@emotion/styled';
import Image from 'next/image';

export const ChristmasCalendar = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  margin-top: 24px;
  justify-content: center;
  .swiper-thumbs {
    margin-bottom: 30px;
    .swiper-slide {
      height: 40px;
      align-items: center;
      border-radius: 6px;
      color: var(--white);
      text-align: center;
      display: flex;
      justify-content: center;
    }
  }
  .swiper-slide-thumb-active {
    background: linear-gradient(90deg, var(--bluish-violet) 0%, var(--pure-blue) 103.89%);
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    margin-top: 32px;
  }
`;

export const CalendarGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  @media screen and (max-width: 1200px) {
    margin: 0 40px;
  }
  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SwiperSlideMobile = styled.div`
  img {
    object-fit: contain;
  }
`;

export const SwiperSlideLabel = styled.h3`
  padding-top: 32px;
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  opacity: 0.06;
  text-align: center;

  @media screen and (max-width: 414px) {
    padding-top: 8px;
    font-size: 20px;
  }

  @media screen and (max-width: 375px) {
    padding-top: 4px;
    font-size: 20px;
  }
`;

export const DayLabel = styled.h3`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--white);
  text-transform: uppercase;
`;

export const SwiperSlideNavigation = styled.div``;

export const CalendarDay = styled.div<{
  isMissed: boolean;
  rowSpan: boolean;
  columnSpan: boolean;
  isToday: boolean;
  isFuture: boolean;
}>`
  display: flex;
  min-height: 220px;
  flex-direction: column;
  justify-content: center;
  padding: 16px 24px;
  align-items: center;
  cursor: pointer;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 12px;
  border: ${({ isToday }) => (!isToday ? 'none' : '1px solid var(--dark-violet)')};
  background: var(--very-dark-violet-300);
  ${({ rowSpan }) => rowSpan && `grid-row: span 2;`}
  ${({ columnSpan }) => columnSpan && `grid-column: span 2;`}
  transition: background 0.3s ease, border 0.3s ease;
  opacity: ${({ isToday }) => (isToday ? 1 : 0.5)};
  @media screen and (max-width: 768px) {
    min-height: 250px;
  }

  @media screen and (max-width: 414px) {
    min-height: 170px;
  }

  @media screen and (max-width: 375px) {
    min-height: 150px;
  }

  @media screen and (max-width: 320px) {
    min-height: 120px;
  }

  ${({ isMissed, isToday, isFuture }) =>
    !isMissed &&
    (isToday || isFuture) &&
    `&:hover {
    opacity: 1;
    border: ${isToday ? 'none' : '1px solid transparent'};
    background: ${
      isToday
        ? 'radial-gradient(circle, rgba(24,12,53,1) 0%, rgb(46, 27, 62) 1%, rgba(24,12,53,1) 100%)'
        : 'var(--dark-violet)'
    };
    .time-remaining {
      display: block !important; 
    }
    h3 {
      transform: ${isToday || isFuture ? 'translateY(-45%)' : 'none'};
      transition: transform 0.3s ease;
    }
    img {
      transform: ${isToday ? 'scale(1.25)' : isFuture ? 'rotate(30deg)' : 'none'};
      transition: transform 0.5s ease;
    }
    
  }`}
}
  ,
  h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    color: var(--white);
    text-transform: uppercase;
  }
`;

export const StyledTimeRemaining = styled.p`
  display: none;
  color: white;
  @media screen and (max-width: 768px) {
    display: block;
    padding-top: 32px;
  }

  @media screen and (max-width: 414px) {
    padding-top: 16px;
  }

  @media screen and (max-width: 375px) {
    padding-top: 12px;
  }
`;

export const GiveawayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  color: var(--white);
  min-height: 236px;
  background-repeat: no-repeat;
`;

export const Title = styled.h2`
  flex-grow: 1;
  font-weight: normal;
  text-align: center;
  align-self: center;
  text-transform: uppercase;
  margin: 0;
  font-size: 32px;
  color: var(--white);
  span {
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    margin-top: 16px;
    font-size: 24px;
  }

  @media screen and (max-width: 320px) {
    font-size: 20px;
  }
`;

export const GiftBoxImage = styled(Image)`
  @media screen and (max-width: 414px) {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 375px) {
    width: 70px;
    height: 70px;
  }

  @media screen and (max-width: 320px) {
    width: 50px;
    height: 50px;
  }
`;

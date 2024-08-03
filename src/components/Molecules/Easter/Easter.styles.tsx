import styled from '@emotion/styled';
import { assets } from '@/config/assets';
import Typography from '@/components/Atoms/Typography/Typography';

export const EasterBannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  color: var(--white);
  position: relative;
  min-height: 236px;
  background: url(${assets}/images/easter-banner.svg) no-repeat;
  margin: 12px 0;
  @media (max-width: 991px) {
    margin: 0;
  }
`;

export const CountdownWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 212px;
  display: flex;
  justify-content: center;
  background: var(--very-dark-des-violet);
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
`;

export const Title = styled(Typography)`
  flex-grow: 1;
  text-align: center;
  align-self: center;
  text-transform: uppercase;
  margin: 0;
  color: var(--white);
  line-height: 1.2;

  @media (max-width: 768px) {
    margin-top: 16px;
  }

  .Heading-h2 {
    font-weight: normal;
    font-size: 24px;

    @media (max-width: 320px) {
      font-size: 20px;
    }
  }
`;

export const EasterCalendarContainer = styled.div`
  position: relative;
  background: var(--very-dark-violet-300);
  padding: 18px 16px 16px 16px;
  @media (max-width: 991px) {
    padding: 18px 0;
  }
`;

export const SwitcherContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  &:first-child > div {
    @media (max-width: 991px) {
      max-width: 100% !important;
      margin-bottom: 24px;
    }
  }
`;

export const EasterGridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 24px;
  & .swiper {
    width: 100%;
    height: 100%;
  }
  & .swiper-grid-column > .swiper-wrapper {
    flex-direction: unset !important;
  }
  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const EasterRandomize = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  & button {
    max-width: 155px;
    display: flex;
    align-items: center;
  }
  @media (max-width: 991px) {
    margin-top: 16px;
  }
`;
export const SingleEaster = styled.div`
  width: 100%;
  display: flex;
  min-height: 177px;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
  flex-direction: column;
  gap: 10px;
  & h5 {
    display: none;
  }
  @media (max-width: 991px) {
    & h5 {
      display: initial;
    }
    background-color: var(--very-dark-violet-3);
    border: 2px solid var(--very-dark-violet-300);
  }
`;

export const EasterRulesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 991px) {
    padding: 0 28px;
  }
  & p {
    & strong {
      color: var(--white);
      font-weight: 600;
    }
    font-size: 14px;
    color: var(--white-2);
  }
`;

export const ImageWrapper = styled.div`
  width: 83px;
  height: 83px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.3);
  }
`;

export const EasterPrizesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 24px;
  & .swiper {
    width: 100%;
    & .swiper-slide {
      display: inline-flex;
    }
  }
  @media (max-width: 991px) {
    align-items: center;
  }
`;

export const SinglePrize = styled.div`
  width: 100%;
  display: flex;
  min-height: 190px;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
  flex-direction: column;
  gap: 28px;
  background-color: var(--very-dark-violet-3);
`;

export const HoverText = styled.div<{ isVisible: boolean; isTop?: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  margin-top: ${({ isTop }) => (isTop ? '-12px' : '0px')};
  @media (max-width: 992px) {
    display: none;
  }
`;

export const DrawerContainer = styled.div<{ open: boolean | undefined }>`
  margin-left: ${({ open }) => (open ? '-60px' : 0)};
  margin-bottom: 15px;
  cursor: pointer;
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const DrawerContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
  & span {
    font-weight: 500;
    line-height: 20px;
  }
`;

export const EggCrackerContainer = styled.div`
  cursor: pointer;
  max-width: 200px;
  position: relative;
`;

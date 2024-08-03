import styled from '@emotion/styled';
import CarouselBanner from '@/components/Atoms/CarouselBanner/CarouselBanner';
import { css } from '@emotion/react';
import Typography from '@/components/Atoms/Typography/Typography';
import Button from '@/components/Atoms/Button/Button';

export const BannerBackground = styled('div')<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: object-fit;
  width: 100%;
  height: 146px;
  min-height: 1px;
  border-radius: 12px;
  z-index: -1;
`;

export const Banner = styled(CarouselBanner)`
  height: 290px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

export const alignRightHeader = css`
  text-align: right;
`;
export const alignRightData = css`
  text-align: right;
  color: var(--yellow-4);
`;

export const HeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  padding-top: 5px;
  background: var(--very-dark-violet-200);
  height: 44px;
  border-radius: 6px 6px 0px 0px;
`;

export const Title = styled(Typography)`
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: var(--white);
  margin-left: -10px;
  margin-top: -8px;
`;

export const MainContainer = styled.div`
  padding-left: 12px;
  padding-right: 12px;
`;

export const FooterContainer = styled.div`
  display: flex;
  margin-top: 4px;
  background: var(--very-dark-violet-3);
  padding: 8px 0px 8px 16px;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px 6px 6px 6px;
`;

export const InfoSection = styled.div`
  display: flex;
  gap: 8px;
`;

export const InfoText = styled.div`
  color: var(--darker-white);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

export const RulesButton = styled(Button)`
  margin-right: 8px;
`;

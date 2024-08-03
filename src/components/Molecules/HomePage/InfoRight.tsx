import { styled } from '@mui/material/styles';

import { Container } from '@/components/Atoms';
import Image from 'next/image';

type InfoRightType = { infoSrc: string };
const InfoImage = styled(Image)({
  width: '20px',
  height: 'auto',
  '@media screen and (max-width:1100px)': {
    width: '15px'
  }
});
const InfoRightContainer = styled(Container)({
  background: '#26174B',
  borderRadius: '0 0 15px 15px',
  width: '50px',
  display: 'flex',
  justifyContent: 'center',
  padding: '12px 0 14px 0',
  alignItems: 'center',
  '@media screen and (max-width:1100px)': {
    width: '39px',
    padding: '10px 0',
    borderRadius: '0 0 12px 12px'
  },
  '@media screen and (max-width:479px)': {
    width: '42px',
    padding: '12px 0'
  }
});

export const InfoRight = ({ infoSrc }: InfoRightType) => (
  <InfoRightContainer data-testid="info-right-container">
    <InfoImage width={20} height={20} alt="information" src={infoSrc} />
  </InfoRightContainer>
);

import { styled } from '@mui/material/styles';

import Image from 'next/image';

const HeaderImageStyled = styled(Image)({
  height: 'auto',
  verticalAlign: 'middle',
  '@media screen and (max-width:479px)': {
    width: '90px'
  }
});

type HeaderImageType = {
  alt: string;
  src: string;
  width: number;
  height: number;
};

export const HeaderImage: React.FC<HeaderImageType> = ({ alt, src, width, height }) => {
  return <HeaderImageStyled width={width} height={height} alt={alt} src={src} />;
};

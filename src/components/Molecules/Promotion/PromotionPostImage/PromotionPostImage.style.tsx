import { styled } from '@mui/material/styles';
import Image from 'next/image';

export const PromotionPostImageStyle = styled(Image)({
  borderRadius: '12px 12px 0 0',
  display: 'block',
  width: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'transform .3s'
});

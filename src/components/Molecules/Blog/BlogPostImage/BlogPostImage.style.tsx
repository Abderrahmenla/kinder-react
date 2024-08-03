import { styled } from '@mui/material/styles';
import Image from 'next/image';

export const BlogPostImageStyle = styled(Image)({
  borderRadius: '15px 15px 0 0',
  display: 'block',
  width: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'transform .3s'
});

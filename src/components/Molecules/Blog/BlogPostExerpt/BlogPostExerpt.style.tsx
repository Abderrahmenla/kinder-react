import { styled } from '@mui/material/styles';

export const BlogPostExerptContainer = styled('div')({
  marginTop: '8px',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-17)',
  fontWeight: 400,
  color: 'var(--soft-blue-100)',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 3,
  '* ': { display: 'inline' }
});

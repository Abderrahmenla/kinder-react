import { styled } from '@mui/material/styles';

export const AnswerItem = styled('div')<{ isVisible: boolean }>(({ isVisible }) => ({
  visibility: isVisible ? 'visible' : 'hidden',
  background: 'var(--very-dark-violet-200)',
  padding: '24px 25px 34px 24px',
  textOverflow: 'ellipsis',
  borderRadius: 6,
  fontWeight: 400,
  position: 'absolute',
  top: 12,
  width: '100%',
  right: 0,
  zIndex: 1,
  fontSize: 14,
  lineHeight: 'normal',
  color: 'rgba(255, 255, 255, 0.60)',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  '& a ': {
    color: 'var(--pure-blue)',
    fontWeight: 500
  }
}));

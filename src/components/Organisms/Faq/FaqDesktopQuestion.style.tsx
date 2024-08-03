import { styled } from '@mui/material/styles';

export const QuestionContainer = styled('div')<{ isVisible: boolean }>(({ isVisible }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  height: '100%',
  alignItems: 'center',
  background: isVisible ? 'var(--very-dark-violet-5)' : 'var(--very-dark-violet-300)',
  maxHeight: 76,
  padding: '12px 16px 12px 12px',
  width: '100%',
  cursor: 'pointer',
  borderRadius: isVisible ? 6 : 0,
  transition: 'background .3s'
}));

export const QuestionText = styled('h2')({
  margin: 0,
  fontWeight: 500,
  fontSize: 'var(--font-size-14)',
  lineHeight: 'normal',
  color: 'var(--light-violet)'
});

import { styled } from '@mui/material/styles';

export const FaqItemContainer = styled('div')({
  width: '100%',
  position: 'relative',
  height: 'auto'
});

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
  transition: 'background .3s',
  marginTop: 33,
  marginBottom: 18,
  '@media screen and (max-width:1023px)': {
    marginTop: 0,
    marginBottom: 0
  }
}));

export const QuestionText = styled('h2')({
  margin: 0,
  fontWeight: 500,
  fontSize: 'var(--font-size-14)',
  lineHeight: 'normal',
  color: 'var(--darker-white)'
});

export const AnswerContainer = styled('div')<{ isVisible: boolean }>(({ isVisible }) => ({
  background: 'var(--very-dark-violet-200)',
  marginTop: 8,
  padding: 16,
  borderRadius: 6,
  visibility: isVisible ? 'visible' : 'hidden',
  fontWeight: 400,
  position: isVisible ? 'relative' : 'absolute',
  width: '100%',
  left: 0,
  zIndex: 1,
  fontSize: 'var(--font-size-14)',
  lineHeight: 'normal',
  color: 'rgba(255, 255, 255, 0.60)',
  overflow: 'hidden',
  transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
  transition: 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  '& a ': {
    color: 'var(--pure-blue)',
    fontWeight: 500
  }
}));

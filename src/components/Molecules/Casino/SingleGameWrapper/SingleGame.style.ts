import { styled } from '@mui/material/styles';

export const SingleGameWrapper = styled('div')<{
  isSearchWrapper?: boolean;
  isErrorWrapper?: boolean;
}>(({ isSearchWrapper, isErrorWrapper }) => ({
  display: 'flex',
  position: 'relative',
  flexWrap: 'wrap',
  gap: '16px',
  width: '100%',
  marginTop: isErrorWrapper ? '9px' : '24px',
  background: isSearchWrapper || isErrorWrapper ? 'var(--very-dark-violet-3)' : 'inherit',
  padding: isSearchWrapper ? '15px' : 'initial',
  borderRadius: isSearchWrapper ? '6px' : 'initial',
  '@media(max-width: 1300px)': {
    margin: '0 20px',
    marginTop: isSearchWrapper ? '0' : '40px',
    rowGap: '15px'
  },
  '@media(max-width: 991px)': {
    marginTop: '20px'
  },
  '@media(max-width: 576px)': {
    rowGap: '6px',
    gap: '6px'
  },
  '&:before': {
    content: isSearchWrapper ? "''" : 'none',
    position: 'absolute',
    top: '-15px',
    right: '70px',
    borderBottom: '20px solid var(--very-dark-violet-3)',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    width: 0,
    height: 0
  }
}));

export const GameResultText = styled('div')({
  margin: '30px auto',
  display: 'flex',
  padding: '14px 18px',
  alignItems: 'center',
  gap: '10px',
  fontSize: '16px',
  backgroundColor: 'var(--very-dark-violet-5)'
});
export const SingleGame = styled('div')({
  display: 'flex',
  overflow: 'hidden',
  width: 'calc(100% / 7 - 14px)',
  position: 'relative',
  '& .game-tile': {
    height: '100%',
    cursor: 'pointer'
  },
  '&:hover .game-tile': {
    visibility: 'visible',
    opacity: 1
  },
  transition: 'transform 0.3s ease-out 0s;',
  '@media(max-width: 1300px)': {
    width: 'calc(100% / 6 - 19px)'
  },
  '@media(max-width: 1000px)': {
    width: 'calc(100% / 5 - 20px)'
  },
  '@media(max-width: 991px)': {
    '& .game-tile': {
      display: 'none'
    }
  },
  '@media(max-width: 576px)': {
    width: 'calc(100% / 3 - 17px)'
  },
  '& img': {
    height: '100% !important',
    width: '100% !important',
    borderRadius: '6px'
  }
});

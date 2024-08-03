import { styled } from '@mui/material/styles';

export const ModalOverlay = styled('div')({
  width: '100%',
  height: '100%',
  background: 'rgba(30, 19, 59, .85)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2
});

export const ModalContent = styled('div')({
  backgroundColor: '#331C6B',
  position: 'absolute',
  top: 'calc(100% + 25px)',
  width: '100%',
  maxHeight: '400px',
  overflowY: 'auto',
  padding: '32px',
  borderRadius: '25px',
  zIndex: 11,
  '& p': {
    fontSize: '14px',
    color: 'var(--mod-blue-200)',
    textAlign: 'center',
    margin: 0
  }
});

export const ModalContentResult = styled('div')({
  display: 'grid',
  marginTop: '19.5px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 7 * 10px) / 8), 1fr))',
  rowGap: '20px',
  columnGap: '15px',
  '@media(max-width: 1300px)': {
    rowGap: '15px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 6 * 10px) / 7), 1fr))'
  },
  '@media(max-width: 1000px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 5 * 10px) / 6), 1fr))'
  },
  '@media(max-width: 850px)': {
    rowGap: '10px',
    columnGap: '10px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 4 * 20px) / 4), 1fr))'
  },
  '@media(max-width: 576px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 3 * 10px) / 3), 1fr))'
  },
  '@media(max-width: 400px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(calc((100% - 2 * 10px) / 2), 1fr))'
  }
});

export const GameTileSearch = styled('div')({
  position: 'relative',
  display: 'flex',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  borderRadius: '15px',
  transition: 'transform 0.3s ease-out 0s',
  '& img': {
    width: '100% !important',
    height: '100% !important'
  },
  '.game-tile': {
    height: '100%',
    cursor: 'pointer'
  },
  '@media(max-width: 991px)': {
    '.game-tile': {
      display: 'none'
    }
  },
  '&:hover .game-tile': {
    visibility: 'visible',
    opacity: 1
  }
});

export const ModalContentResultWrapper = styled('div')({
  '& a': {
    display: 'flex',

    '@media(max-width: 768px)': {
      '&:hover': {
        transform: 'none'
      }
    }
  }
});

import styled from '@emotion/styled';

interface VipLevelTitleProps {
  isActive?: boolean;
}

export const TitlesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
  marginTop: 20,
  gap: 8,
  borderRadius: 6,
  overflowX: 'auto',
  '& .swiper': {
    width: '100%!important',
    '& .swiper-wrapper': {
      width: '100%!important',
      boxSizing: 'inherit'
    }
  },

  '& .swiper-slide': {
    width: 'auto!important'
  },

  '& >div > div': {
    alignItems: 'center',
    whiteSpace: 'nowrap',
    justifyContent: 'space-between',
    '& > div': {
      '@media screen and (max-width:479px)': {
        minWidth: 70
      }
    }
  }
});

export const VipLevelTitle = styled('div')<VipLevelTitleProps>(({ isActive }) => ({
  color: 'var(--white)',
  fontSize: 'var(--font-size-14)',
  textAlign: 'center',
  background: isActive ? 'var(--bg-gradient-active)' : '',
  cursor: 'pointer',
  borderRadius: 6,
  padding: 10,
  '&:hover': {
    background: 'var(--very-dark-des-violet)'
  },
  '@media screen and (max-width:479px)': {
    fontSize: 'var(--font-size-14)'
  }
}));

import { styled } from '@mui/material/styles';

interface StepProps {
  bg?: string;
  hoverIcon?: string;
}

export const StepsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 20,
  gap: 20,
  height: 48,
  '@media screen and (max-width:479px)': {
    paddingTop: 12,
    marginTop: 12
  },
  '& .swiper-wrapper': {
    width: '100%!important',
    boxSizing: 'inherit'
  }
});

export const Step = styled('div')<StepProps>(({ bg, hoverIcon }) => ({
  color: 'var(--white)',
  padding: '10px 20px 10px 14px',
  backgroundColor: 'var(--very-dark-violet-3)',
  width: '100%',
  borderRadius: 6,
  position: 'relative',
  transition: 'all .4s ease',
  height: '100%',
  '@media screen and (min-width:700px)': {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    '& span, & strong': {
      display: 'block'
    }
  },

  '&:hover': {
    backgroundColor: 'var(--very-dark-violet-5)',
    '&::after': {
      transform: 'translate(0,-50%) rotate(-90deg)',
      backgroundImage: `url(${hoverIcon})`
    }
  },
  '@media screen and (max-width:479px)': {
    padding: '12px 18px',
    fontSize: 'var(--font-size-12)',
    color: 'var(--soft-blue-100)',
    minWidth: 120,
    '& strong': {
      display: 'block',
      color: 'var(--white)'
    }
  },

  '&::after': {
    content: '""',
    backgroundImage: bg ? `url(${bg})` : 'none',
    backgroundSize: 'contain',
    display: 'inline-block',
    width: 24,
    height: 24,
    margin: '0 10px',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'all .4s ease',
    '@media screen and (max-width:479px)': {
      width: 32,
      height: 32
    }
  }
}));

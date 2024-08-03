import { styled } from '@mui/material/styles';

export const FormGroupButtonContainer = styled('div')({
  marginTop: '22px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  display: 'flex'
});

export const FormButton = styled('button')<{
  isLoading?: boolean;
  variant?: 'sm' | 'base';
  width?: string;
  height?: string;
}>(({ isLoading, variant, width, height }) => ({
  width: width ? width : 'inherit',
  height: height ? height : 'inherit',
  transition: 'box-shadow .4s',
  background: isLoading ? '#5C42A6' : 'linear-gradient(90deg, #FFDE09 0%, #FFBD14 99.48%)',
  ':hover': {
    boxShadow: 'rgba(255, 222, 9, 0.7) 0px 0px 10px 0px'
  },
  borderRadius: '23px',
  padding: '16px 33px',
  color: 'var(--very-dark-violet)',
  fontSize: variant === 'base' ? 'var(--font-size-14)' : 'var(--font-size-12)',
  lineHeight: 'var(--l-height-13)',
  letterSpacing: 'var(--lt-spacing)',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  textDecoration: 'none',
  outline: 'none',
  cursor: isLoading ? 'not-allowed' : 'pointer',
  border: 'none',
  textAlign: 'center',

  '@media screen and (max-width:479px)': {
    width: '100%'
  }
}));

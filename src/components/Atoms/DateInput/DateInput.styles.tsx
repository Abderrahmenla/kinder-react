import { styled } from '@mui/material/styles';

export const LabelContainer = styled('label')({
  display: 'flex',
  position: 'relative',
  gap: '5px',
  alignItems: 'center'
});

export const DateInputContainer = styled('div')({
  fontWeight: 400,
  marginBottom: '20px',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-17)',
  color: 'var(--soft-violet)',
  '& input': {
    '&:hover': {
      borderColor: 'var(--light-blue)',
      transition: 'border 0.3s ease-out'
    },
    '&:focus': {
      border: '1px solid #FFD70C',
      outline: 'none'
    }
  }
});

export const InputRow = styled('div')({
  position: 'relative',
  marginTop: '8px'
});

type InputProps = {
  errMsg?: string;
};

export const Input = styled('input')<InputProps>(({ errMsg }) => ({
  background: 'var(--very-dark-violet-300)',
  borderRadius: '6px',
  border: '1px solid',
  borderColor: errMsg ? 'var(--vivid-red)' : 'var(--very-dark-des-violet)',
  padding: '8px 14px',
  height: '40px',
  letterSpacing: '0.03em',
  appearance: 'none',
  fontSize: 'var(--font-size-12)',
  color: 'var(--white)',
  fontWeight: '400',
  outline: 'none',
  width: '100%'
}));

export const Sup = styled('sup')({
  color: 'var(--vivid-red)',
  marginLeft: '4px',
  fontSize: 'var(--font-size-12)',
  position: 'relative',
  top: '4px'
});

export const FormErr = styled('div')({
  '& span': {
    marginTop: '5px',
    color: 'var(--vivid-red)',
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-13)',
    fontWeight: 400
  }
});

export const InputRowWrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

export const InputDateLeftCol = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

export const CalendarContainer = styled('div')({
  alignItems: 'center',
  borderRadius: '15px',
  display: 'flex',
  '& input': {
    padding: 0,
    border: 'none',
    width: '100%',
    height: '100%',
    fontSize: 0,
    lineHeight: 'unset',
    background: 'transparent',
    outline: 'none',
    color: 'transparent',
    cursor: 'pointer',
    opacity: 0,
    '&:hover': {
      border: 'none !important'
    }
  }
});

export const CalendarIconContainer = styled('div')({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  borderRadius: '4px',
  background: 'var(--very-dark-des-violet)',
  padding: '3px',
  cursor: 'pointer',
  '&:hover': {
    background: '#8E6CFF',
    '& svg path': {
      fill: 'var(--white)'
    }
  }
});

export const InputDateCell = styled('div')<InputProps>(({ errMsg }) => ({
  width: 'auto',
  display: 'flex',
  marginRight: '8px',
  '& input': {
    background: 'var(--very-dark-violet-300)',
    border: '1px solid',
    borderColor: errMsg ? 'var(--vivid-red)' : 'var(--very-dark-des-violet)',
    borderRadius: '6px',
    padding: '0 14px',
    height: '42px',
    letterSpacing: '0.03em',
    appearance: 'none',
    fontSize: 'var(--font-size-12)',
    color: 'var(--white)',
    fontWeight: 400,
    outline: 'none',
    width: '100%',
    textAlign: 'left'
  },
  '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':
    {
      webkitAppearance: 'none',
      appearance: 'none',
      margin: 0
    }
}));

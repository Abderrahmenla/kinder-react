import { styled } from '@mui/material/styles';

type InputProps = {
  errMsg?: string;
};

export const Label = styled('label')({
  paddingLeft: '14px'
});

export const FormGroupContainer = styled('div')({
  fontWeight: 400,
  marginBottom: '20px',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-17)',
  color: 'var(--soft-violet)'
});

export const FormRow = styled('div')({
  position: 'relative',
  marginTop: '8px'
});

export const Input = styled('input')<InputProps>(({ errMsg }) => ({
  background: 'var(--very-dark-violet-300)',
  borderRadius: '15px',
  border: '1px solid',
  borderColor: errMsg ? 'var(--vivid-red)' : 'var(--very-dark-des-violet)',
  padding: '0 14px',
  height: '42px',
  letterSpacing: '0.03em',
  appearance: 'none',
  fontSize: 'var(--font-size-12)',
  color: 'var(--white)',
  fontWeight: '400',
  outline: 'none',
  width: '100%',
  '&:-webkit-autofill': {
    WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out',
    WebkitTransitionDelay: '9999s'
  },
  '&:-webkit-autofill:hover': {
    WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out',
    WebkitTransitionDelay: '9999s'
  },
  '&:-webkit-autofill:focus': {
    WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out',
    WebkitTransitionDelay: '9999s'
  },
  '&:-webkit-autofill:active': {
    WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out',
    WebkitTransitionDelay: '9999s'
  },
  '&:hover': {
    borderColor: 'var(--light-blue)',
    transition: 'border 0.3s ease-out'
  },
  '&:focus': {
    border: '1px solid var(--yellow-4)',
    outline: 'none',
    background: 'var(--very-dark-violet-300)'
  }
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
    fontSize: 'var(--font-size-10)',
    lineheight: 'var(--l-height-13)',
    fontWeight: 400,
    paddingLeft: '14px'
  }
});

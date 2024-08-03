import { styled } from '@mui/material/styles';

export const InputContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: '12px',
  '& label': {
    width: '100%',
    color: 'var(--soft-blue-100)',
    fontSize: '12px',
    marginBottom: '8px'
  }
});

export const InputComponent = styled('div')<{ size: string }>(({ size }) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  '& input': {
    width: '100%',
    height: size === 'sm' ? '36px' : size === 'md' ? '40px' : size === 'lg' ? '44px' : '48px',
    fontSize: '14px',
    padding:
      size === 'sm' ? '8px' : size === 'md' ? '8px 10px' : size === 'lg' ? '8px 12px' : '8px 14px',
    borderRadius: '6px',
    border: '1px solid var(--dark-violet)',
    background: 'var(--very-dark-violet-300)',
    color: 'rgba(255, 255, 255, 0.60)',
    '&:-webkit-autofill': {
      WebkitTransition: 'color 0.3s ease-out, background-color 0.3s ease-out',
      WebkitTransitionDelay: '0.3s'
    },
    '&:-webkit-autofill:hover': {
      WebkitTransition: 'color 0.3s ease-out, background-color 0.3s ease-out',
      WebkitTransitionDelay: '0.3s'
    },
    '&:-webkit-autofill:focus': {
      WebkitTransition: 'color 0.3s ease-out, background-color 0.3s ease-out',
      WebkitTransitionDelay: '0.3s'
    },
    '&:-webkit-autofill:active': {
      WebkitTransition: 'color 0.3s ease-out, background-color 0.3s ease-out',
      WebkitTransitionDelay: '0.3s'
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
  },
  '& .input-error': {
    border: '1px solid var(--vivid-red)'
  },
  '& .input-validated': {
    border: '1px solid var(--lime-green-400)'
  }
}));

export const InputIcon = styled('div')({
  display: 'flex',
  cursor: 'pointer'
});

export const InputIconContainer = styled('div')({
  display: 'flex',
  position: 'absolute',
  right: '14px',
  bottom: '50%',
  transform: 'translateY(50%)'
});

export const InputError = styled('div')({
  fontSize: '12px',
  width: '100%',
  display: 'flex',
  color: 'var(--vivid-red)',
  marginTop: '5px'
});

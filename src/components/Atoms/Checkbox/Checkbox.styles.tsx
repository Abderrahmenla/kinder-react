import { styled } from '@mui/material/styles';

export const CheckboxContainer = styled('div')({
  marginBottom: '20px'
});

export const FormRow = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

export const Label = styled('label')({
  fontWeight: '400',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-17)',
  color: 'var(--soft-violet)',
  alignItems: 'center',
  display: 'flex'
});

export const LabelLeft = styled('span')<{ hasError?: boolean; checked?: boolean }>(
  ({ hasError, checked }) => ({
    width: '16px',
    height: '16px',
    border: checked ? 'none' : `1px solid ${hasError ? 'var(--vivid-red)' : 'var(--soft-violet)'}`,
    borderRadius: '2px',
    marginRight: '8px',
    flexShrink: 0,
    position: 'relative',
    '&:hover': {
      borderColor: 'var(--white)'
    },
    '& input': {
      margin: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 1,
      left: 0,
      top: 0,
      opacity: 0,
      cursor: 'pointer'
    }
  })
);

export const LabelText = styled('span')({
  color: 'var(--soft-violet)',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-17)',
  fontWeight: 400
});

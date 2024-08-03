import { styled } from '@mui/material/styles';

export const FormGroupContainer = styled('div')({
  marginBottom: '20px'
});

export const FormRow = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

export const Label = styled('label')({
  fontWeight: '400',
  fontSize: 'var(--font-size-12)',
  lineheight: 'var(--l-height-17)',
  color: 'var(--soft-violet)',
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex'
});

export const LabelLeft = styled('span')<{ hasError?: boolean }>(({ hasError }) => ({
  width: '16px',
  height: '16px',
  border: `1px solid ${hasError ? 'var(--vivid-red)' : 'var(--soft-violet)'}`,
  borderRadius: '5px',
  marginRight: '10px',
  flexShrink: 0,
  position: 'relative',
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
}));

export const LabelText = styled('span')({
  color: 'var(--soft-violet)',
  fontSize: 'var(--font-size-12)',
  lineheight: 'var(--l-height-17)',
  fontWeight: 400
});

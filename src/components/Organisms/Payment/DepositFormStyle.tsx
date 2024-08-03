import { styled } from '@mui/material/styles';

export const CopyButton = styled('div')({
  flex: 0,
  backgroundColor: 'var(--yellow-2)',
  cursor: 'pointer',
  borderRadius: '14px',
  padding: '12px',
  height: '42px',
  width: '42px',
  marginTop: '6px',
  marginLeft: '16px',
  alignSelf: 'center',
  ['&:hover']: {
    backgroundColor: 'var(--yellow-2)',
    opacity: 0.5
  }
});

export const QRContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ['& > svg']: {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '14px',
    width: '150px',
    height: '150px'
  }
});

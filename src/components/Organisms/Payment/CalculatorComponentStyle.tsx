import { styled } from '@mui/material/styles';

export const CalculatorContainer = styled('div')({
  color: '#fff',
  textAlign: 'center',
  backgroundColor: '#1A0F36',
  paddingTop: '30px',
  paddingBottom: '30px'
});

export const FormButtonsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  ['& > *']: {
    width: '50%',
    flex: 1
  }
});

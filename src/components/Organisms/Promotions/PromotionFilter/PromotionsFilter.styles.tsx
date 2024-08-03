import Typography from '@/components/Atoms/Typography/Typography';
import { styled } from '@mui/material/styles';

export const PromotionsFilterWrapper = styled('div')({
  display: 'flex',
  marginBottom: '25px',
  gap: '10px'
});
export const PromotionFilterButton = styled('div')({
  padding: '10px 20px',
  margin: '0',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  color: '#fff',
  '&:hover': {
    background: '#3C2A63 !important'
  },
  '&.active': {
    background: 'linear-gradient(90deg, #9746FF 0%, #0092FF 103.89%) !important'
  }
});
export const Label = styled(Typography)({
  fontWeight: 600,
  color: '#fff'
});

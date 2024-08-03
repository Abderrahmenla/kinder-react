import { styled } from '@mui/material/styles';

export const PromotionInfoControl = styled('div')({
  display: 'flex ',
  flexDirection: 'row',
  marginBottom: '4px',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const PromotionInfoControlLeft = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& h6': {
    fontSize: '14px',
    lineHeight: '15px',
    fontWeight: 600,
    color: 'var(--white)',
    margin: '0 30px 0 0'
  },
  '& p': {
    fontWeight: '500',
    fontSize: 'var(--font-size-11)',
    lineHeight: 'var(--l-height-14)',
    color: 'var( --soft-blue-100)'
  }
});

export const PromotionInfoControlLeftCaptions = styled('div')({
  '& .promotionpost-time-date': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    '& span': {
      fontSize: '12px',
      lineHeight: '15px',
      fontStyle: 'normal',
      fontWeight: 500,
      color: 'var(--soft-blue-100)',
      '& .expired': {
        color: 'var(--pure-red)'
      }
    },
    '& .dot-box': {
      width: '3px',
      height: '3px',
      borderRadius: '50px',
      background: 'var(--soft-blue-100)',
      margin: '0 6px'
    }
  }
});

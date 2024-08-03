import { styled } from '@mui/material/styles';

export const BlogInfoControl = styled('div')({
  display: 'flex ',
  flexDirection: 'row',
  marginTop: '13px',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media screen and (max-width:1200px)': {
    marginTop: '20px'
  }
});

export const BlogInfoControlLeft = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& h6': {
    fontSize: '12px',
    lineHeight: '15px',
    fontWeight: 600,
    color: 'var(--white)',
    margin: '0 30px 0 0'
  },
  '& p': {
    fontWeight: '300',
    fontSize: 'var(--font-size-11)',
    lineHeight: 'var(--l-height-14)',
    color: 'var( --soft-blue-100)'
  }
});
export const BlogInfoControlRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(90deg, #FFDE09 0%, #FFBD14 99.48%)',
  borderRadius: '10px',
  cursor: 'pointer',
  width: '35px',
  height: '35px',
  '&:hover': {
    boxShadow: '0px 0px 10px rgba(255, 222, 9, 0.7)'
  }
});

export const BlogInfoControlLeftCaptions = styled('div')({
  marginLeft: '12px',

  '& .blogpost-time-date': {
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    '& span': {
      fontSize: '12px',
      lineHeight: '15px',
      fontStyle: 'normal',
      fontWeight: 300,
      color: 'var(--soft-blue-100)'
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

import { styled } from '@mui/material/styles';

export const BlogPickerWrapper = styled('div')({
  width: '784px',
  flexWrap: 'nowrap',
  gap: '40px',
  margin: '0 auto',
  marginTop: '40px',
  display: 'flex',
  '@media screen and (max-width:1100px)': {
    marginTop: '5px'
  },
  '@media screen and (max-width:1023px)': {
    paddingLeft: '0px',
    paddingRight: '0px',
    margin: '0 auto',
    width: '92%'
  },
  '@media screen and (max-width:900px)': {
    width: '100%'
  },
  '@media screen and (max-width:650px)': {
    flexDirection: 'column'
  }
});
export const BlogPickerDiv = styled('div')({
  marginTop: '35px',
  display: 'flex',
  flex: '1 1 50%',
  flexDirection: 'row',

  '&:hover': {
    boxShadow: '0px 0px 30px var(--very-dark-violet-200)'
  },
  '&:hover span > img': {
    transform: 'scale(1.1)'
  }
});

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `
        url('data:image/svg+xml;utf8,<svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.75781H8.74585C9.51622 3.75781 10.255 4.04849 10.7998 4.5659C11.3445 5.08331 11.6505 5.78508 11.6505 6.51681C11.6505 7.24854 11.3445 7.9503 10.7998 8.46771C10.255 8.98512 9.51622 9.2758 8.74585 9.2758C9.51622 9.2758 10.255 9.56648 10.7998 10.0839C11.3445 10.6013 11.6505 11.3031 11.6505 12.0348C11.6505 12.7665 11.3445 13.4683 10.7998 13.9857C10.255 14.5031 9.51622 14.7938 8.74585 14.7938H1" stroke="white" stroke-width="1.36373" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.93555 3.75781V14.7938" stroke="white" stroke-width="1.36373" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.93555 9.27734H8.74493" stroke="white" stroke-width="1.36373" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.9043 1V3.75899" stroke="white" stroke-width="1.36373" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.77539 1V3.75899" stroke="white" stroke-width="1.36373" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.9043 14.7949V17.5539" stroke="white" stroke-width="1.36373" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.77539 14.7949V17.5539" stroke="white" stroke-width="1.36373" stroke-linecap="round" stroke-linejoin="round"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    background: 'linear-gradient(144.54deg, #9746FF 11.37%, #0092FF 118.48%)',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43034 8.66018C1.15337 10.0602 2.1105 11.433 5.08238 11.433C8.36864 11.433 9.12359 10.1953 9.12359 9.06548C9.12359 7.75916 8.07063 7.14576 5.24599 6.28505C2.42136 5.42433 1.41748 4.59413 1.41748 3.46321C1.41748 2.3323 2.17594 1.0957 5.46336 1.0957C8.39201 1.0957 9.30941 2.60032 9.11541 3.86851" stroke="white" stroke-width="1.18852" stroke-linecap="round" stroke-linejoin="round"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
  }
}));

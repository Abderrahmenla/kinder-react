import { styled } from '@mui/material/styles';

const MainContainer = styled('main')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '90%',
  margin: '0 auto',
  height: '100%',
  padding: '0',
  zIndex: '1',
  position: 'relative'
}));

export default MainContainer;

import { styled } from '@mui/material/styles';
import { ModalContent } from '@/components/Atoms';
import { Box } from '@mui/material';

export const StyledModalContent = styled(ModalContent)`
  height: 490px;
  display: flex;
  flex-direction: column;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`;

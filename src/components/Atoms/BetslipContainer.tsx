import { Grid, styled } from '@mui/material';

export const BetSlipContainer = styled(Grid)`
  @media (max-width: 1280px) {
    display: none;
  }
`;

export const BetSlipItem = styled('div')`
  position: fixed;
  max-height: 580px;
  width: 292px;
  overflow-y: scroll;
  @media (max-width: 1280px) {
    position: relative;
  }
`;

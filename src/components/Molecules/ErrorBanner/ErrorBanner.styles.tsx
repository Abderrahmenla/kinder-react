import { styled } from '@mui/material';

export const ErrorBannerWrapper = styled('div')`
  color: var(--pure-red2);
  position: fixed;
  z-index: 1304;
  background-color: var(--very-dark-violet);
  top: 0px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  font-size: 14px;
  width: 100%;
  a {
    color: var(--white);
  }
  [role='button'] {
    margin-left: 10px;
    color: var(--very-dark-violet-400);
    width: initial;
    height: initial;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 12px;
  }
  @media screen and (max-width: 1100px) {
    padding: 20px 20px;
    bottom: 70px;
  }
`;

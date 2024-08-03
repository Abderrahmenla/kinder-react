import { styled } from '@mui/material';

export const CookieBannerMain = styled('div')`
  color: var(--white);
  position: fixed;
  z-index: 1300;
  background-color: var(--very-dark-violet);
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
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
    bottom: 59px;
  }
`;

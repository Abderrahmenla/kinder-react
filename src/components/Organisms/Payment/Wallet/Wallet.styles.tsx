import styled from '@emotion/styled';

export const WalletContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SwitcherWrapper = styled.div`
  height: fit-content;
  .switcher-tab-button {
    width: 72px;

    > .switcher-text {
      letter-spacing: normal;
    }
  }
`;

import styled from '@emotion/styled';

export const DepositRequiredModalContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const DepositRequiredModalWrapper = styled('div')`
  width: 336px;
  height: 211px;
  background-color: var(--very-dark-violet-5);
  position: absolute;
  z-index: 2;
  padding: 31px 22px 16px 22px;
  text-align: center;
  & button {
    margin-top: 25px;
  }
  & p {
    line-height: normal;
    margin-top: 8px;
  }
`;

export const DepositRequiredModalIcon = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
`;

export const WinDialogContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  & p {
    line-height: normal;
  }
`;

export const WinDialogActions = styled('div')`
  display: flex;
  width: 100%;
  gap: 12px;
`;

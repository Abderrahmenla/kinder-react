import { styled } from '@mui/material/styles';

export const CashbackInfoRow = styled('div')`
  padding: 0 14.5px;
`;

export const CashbackCountdown = styled('div')`
  width: 100%;
  margin: 24px auto auto 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CounterCol = styled('div')`
  margin-right: 0;
  width: 61px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;

  &:not(:last-child) {
    margin-right: 20px;

    &::after {
      content: ':';
      font-weight: 600;
      position: absolute;
      right: -13px;
      top: 30px;
      transform: translateY(-50%);
    }
  }
`;

export const Days = styled('div')`
  width: 100%;
  height: 61px;
  background: var(--very-dark-violet-300);
  border-radius: 10px;
  margin: 0 0 10px 0;
  line-height: 61px;
`;

export const Label = styled('div')`
  width: 100%;
  line-height: 17px;
`;

export const CbkCountdownWrap = styled('div')`
  line-height: 17px;
  margin: 0;
  text-align: center;
`;

export const CbkDate = styled('div')`
  line-height: 14.5px;
  text-align: center;
  margin-top: 6px;
`;

export const CbkText = styled('div')`
  margin-top: 24px;
  line-height: 14.5px;
  font-weight: 300;
  text-align: center;
`;

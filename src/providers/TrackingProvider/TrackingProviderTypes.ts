import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
};

export type UserDepositArgs = {
  value: string;
  currency: string;
  gameCategory?: string;
  gameName?: string;
  userId?: string;
};

export type TrackingController = {
  handleTrackUserRegister: () => void;
  handleTrackUserLogin: (userId?: string) => void;
  handleTrackFirstUserDeposit: (args: UserDepositArgs) => void;
  handleTrackUserDeposit: (args: UserDepositArgs) => void;
};

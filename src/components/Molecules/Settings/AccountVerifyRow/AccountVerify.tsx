import {
  AccountVerifyRow,
  AccountVerifyTop,
  AccountVerifyLeftCol,
  AccountStep,
  AccountStepText,
  AccountVerifyRightcol
} from './AccountVerifyRowStyle';
import Collapse from '@mui/material/Collapse';
import Image from 'next/image';
import { assets } from '@/config/assets';

import { ReactNode } from 'react';

interface AccountVerifyProps {
  step?: number;
  stepText?: string;
  onClick?: () => void;
  isOpen?: boolean;
  children?: ReactNode;
}

// AccountVerify Component
const AccountVerify = ({ step, stepText, onClick, isOpen, children }: AccountVerifyProps) => {
  return (
    <AccountVerifyRow onClick={onClick}>
      <AccountVerifyTop isOpen={isOpen}>
        <AccountVerifyLeftCol>
          <AccountStep>
            <span>{step}</span>
          </AccountStep>
          <AccountStepText>
            <span>{stepText}</span>
          </AccountStepText>
        </AccountVerifyLeftCol>
        <AccountVerifyRightcol>
          <Image
            alt="Arrow"
            src={isOpen ? `${assets}/images/arrowUp.svg` : `${assets}/images/arrowDown.svg`}
            width={11}
            height={8}
          />
        </AccountVerifyRightcol>
      </AccountVerifyTop>
      <Collapse in={isOpen}>{children}</Collapse>
    </AccountVerifyRow>
  );
};

export default AccountVerify;

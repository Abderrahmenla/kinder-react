import React, { useState, useEffect } from 'react';
import {
  Overlay,
  ModalContent,
  ModalWrap,
  ModalContainer,
  ModalHeader,
  ModalWrapContainer
} from '../Atoms';
import Deposit from '../Organisms/Payment/DepositOld';
import { useRecoilValue } from 'recoil';
import { openPaymentPageState } from '../state/openPaymentPageState';
import { apiClient } from 'src/services/clientAxios';
import { useLoader } from '@/hooks/useLoader';

const WalletIcon = () => {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2249_675)">
        <path
          d="M19.6987 21.9959H3.3006C2.67931 21.9959 2.08346 21.7266 1.64414 21.2474C1.20482 20.7681 0.958008 20.1181 0.958008 19.4403V7.94032C0.958008 7.26255 1.20482 6.61253 1.64414 6.13327C2.08346 5.65401 2.67931 5.38477 3.3006 5.38477H19.6987C20.32 5.38477 20.9159 5.65401 21.3552 6.13327C21.7945 6.61253 22.0413 7.26255 22.0413 7.94032V19.4403C22.0413 20.1181 21.7945 20.7681 21.3552 21.2474C20.9159 21.7266 20.32 21.9959 19.6987 21.9959Z"
          fill="#9D81EA"
          stroke="#9D81EA"
          strokeWidth="0.830556"
        />
        <path
          d="M18.5275 5.38482V3.59977C18.5274 3.20813 18.4447 2.82176 18.286 2.47049C18.1273 2.11922 17.8966 1.81245 17.6119 1.57386C17.3273 1.33528 16.9961 1.17127 16.6441 1.0945C16.292 1.01773 15.9285 1.03025 15.5816 1.1311L2.69738 4.87882C2.19847 5.02386 1.75746 5.34465 1.44291 5.79132C1.12836 6.23798 0.957893 6.78551 0.958008 7.34877V7.94038"
          stroke="#9D81EA"
          strokeWidth="0.830556"
        />
        <path
          d="M18.3996 11.5C17.1293 11.5 16.0996 12.53 16.0996 13.8004C16.0996 15.0707 17.1293 16.1004 18.3996 16.1004C19.67 16.1004 20.6996 15.0707 20.6996 13.8004C20.6996 12.53 19.67 11.5 18.3996 11.5ZM19.6096 13.8995L19.085 14.0579C18.9043 14.1124 18.7123 14.3047 18.6578 14.4851L18.4994 15.01C18.4449 15.1904 18.3557 15.1904 18.3012 15.01L18.1428 14.4851C18.0883 14.3047 17.8959 14.1124 17.7156 14.0579L17.19 13.8995C17.0096 13.8449 17.0096 13.7558 17.19 13.7013L17.7149 13.5429C17.8953 13.4883 18.0876 13.296 18.1421 13.1156L18.3005 12.591C18.3551 12.4103 18.4442 12.4103 18.4987 12.591L18.6571 13.1156C18.7116 13.2963 18.904 13.4883 19.0844 13.5429L19.609 13.7013C19.79 13.7554 19.79 13.8449 19.6096 13.8995Z"
          fill="#362957"
        />
      </g>
      <defs>
        <clipPath id="clip0_2249_675">
          <rect width="23" height="23" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

interface PaymentPagePageProps {
  handleClosePayment?: () => void;
}

const PaymentPageOld: React.FC<PaymentPagePageProps> = ({ handleClosePayment }) => {
  const [iframeUrl, setIframeUrl] = useState();
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');
  const { open } = useRecoilValue(openPaymentPageState);

  const deposit = async () => {
    toggleLoader(true);

    try {
      const result = await apiClient.post('/api/payment/deposit', {
        testMode: true
      });
      setIframeUrl(result?.data?.redirectURL);
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
    toggleLoader(false);
  };

  useEffect(() => {
    if (!open) return;
    deposit();
  }, [open]);

  const cryptoProps = {
    iframeUrl,
    isLoading,
    loadingWrapper,
    deposit
  };

  return (
    <ModalContainer open={open}>
      <Overlay onClick={handleClosePayment} />
      <ModalWrap className="wallet-modal" open={open}>
        <ModalWrapContainer>
          <ModalHeader onClose={handleClosePayment}>
            <WalletIcon />
            <span>Wallet</span>
          </ModalHeader>
          <ModalContent>
            <Deposit {...cryptoProps} />
          </ModalContent>
        </ModalWrapContainer>
      </ModalWrap>
    </ModalContainer>
  );
};

export default PaymentPageOld;

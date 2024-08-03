import { useRecoilState } from 'recoil';
import dynamic from 'next/dynamic';
import PaymentBackButton from '@/components/Molecules/Payment/PaymentBackButton/PaymentBackButton';
import { PaymentContentScrollbar } from '@/components/Templates/Payment/Payment.styles';
import { cryptoState } from '@/state/payment/cryptoState';
import { useCallback } from 'react';

const ChannelComponent = dynamic(() => import('./Channel'));
const CryptoItemList = dynamic(() => import('./CryptoItemList'));

const Crypto = ({ onClickBack }: { onClickBack: () => void }) => {
  const [{ selectedCrypto }, setCryptoData] = useRecoilState(cryptoState);

  const handleClickBackButton = useCallback(() => {
    setCryptoData((prev) => ({ ...prev, selectedCrypto: {} }));
    onClickBack();
  }, [onClickBack]);

  return (
    <>
      <PaymentBackButton label="Cryptocurrency" onClick={handleClickBackButton} />
      <PaymentContentScrollbar>
        {Object.keys(selectedCrypto).length > 0 ? <ChannelComponent /> : <CryptoItemList />}
      </PaymentContentScrollbar>
    </>
  );
};

export default Crypto;

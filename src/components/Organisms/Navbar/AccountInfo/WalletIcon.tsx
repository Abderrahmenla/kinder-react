import { assets } from '@/config/assets';
import Image from 'next/image';

export const WalletIcon = () => (
  <Image
    src={`${assets}/images/wallet-small.svg`}
    height={17.5}
    width={17.5}
    alt="wallet"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  />
);

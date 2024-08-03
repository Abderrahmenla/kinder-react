import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BitcoinTextWrapper,
  BitcoinText
} from '@/components/Molecules/Footer/FooterCurrencies/FooterCurrency.styles';

const FooterCurrency: React.FC = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);

  const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd'
        }
      });

      const price = response?.data?.bitcoin.usd;

      setBitcoinPrice(price);
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
    }
  };

  useEffect(() => {
    fetchBitcoinPrice();
  }, []);

  return (
    <BitcoinTextWrapper data-testid={'bitcoin-price'}>
      <BitcoinText size="h5" type="Heading">
        1 BTC = ${bitcoinPrice}
      </BitcoinText>
    </BitcoinTextWrapper>
  );
};

export default FooterCurrency;

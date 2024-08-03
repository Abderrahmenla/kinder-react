import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterCurrency from '@/components/Molecules/Footer/FooterCurrencies/FooterCurrency';
import { BitcoinTextWrapper } from '@/components/Molecules/Footer/FooterCurrencies/FooterCurrency.styles';

jest.mock('axios');

describe('FooterCurrency', () => {
  test('renders the component', () => {
    render(<FooterCurrency />);
    const btcPriceElement = screen.getByText(/1 BTC = \$/i);
    expect(btcPriceElement).toBeInTheDocument();
  });

  test('displays the initial Bitcoin price', async () => {
    render(<BitcoinTextWrapper data-testid={'bitcoin-price'} />);
    const btcPriceElement = await screen.findByTestId('bitcoin-price');
    expect(btcPriceElement).toBeInTheDocument();
  });
});

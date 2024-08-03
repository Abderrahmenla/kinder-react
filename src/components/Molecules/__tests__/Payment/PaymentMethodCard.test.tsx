/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PaymentMethodCard from '../../Payment/PaymentMethodCard';

describe('PaymentMethodCard', () => {
  it('should render the component correctly', () => {
    render(
      <PaymentMethodCard>
        <img
          src="https://coindirect-filestore.s3.amazonaws.com/com.coindirect.core.finance.Currency/8f38072b-c756-446b-b9ef-0ba34d176689.png"
          aria-label="Bitcoin"
          alt="Bitcoin"
          width={42}
          height={42}
        />
        <div>Bitcoin</div>
      </PaymentMethodCard>
    );
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByAltText('Bitcoin')).toBeInTheDocument();
  });

  it('should render correct styles on hover', async () => {
    render(
      <PaymentMethodCard data-testid="payment-method">
        <img
          src="https://coindirect-filestore.s3.amazonaws.com/com.coindirect.core.finance.Currency/8f38072b-c756-446b-b9ef-0ba34d176689.png"
          aria-label="Bitcoin"
          alt="Bitcoin"
          width={42}
          height={42}
        />
        <div>Bitcoin</div>
      </PaymentMethodCard>
    );

    fireEvent.mouseEnter(screen.getByAltText('Bitcoin'));
    // Since the transition is 300ms, there's a 400ms delay added so we can wait long enough for the styles to apply
    setTimeout(() => {
      expect(screen.getByTestId('payment-method')).toHaveStyle({
        cursor: 'pointer',
        border: '1px solid var(--soft-blue-100)'
      });
    }, 400);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BonusDarkButton } from '../../Payment/BonusDarkButton';

describe('BonusDarkButton component', () => {
  test('renders a BonusDarkButton component dialog', () => {
    render(<BonusDarkButton>Label</BonusDarkButton>);
    const bonusDarkButton = screen.getByTestId('bonus-dark-btn');
    expect(bonusDarkButton).toBeInTheDocument();
  });

  test('renders a BonusDarkButton containing first bonus', () => {
    render(<BonusDarkButton>Label</BonusDarkButton>);
    const bonusDarkButton = screen.getByTestId('bonus-dark-btn');
    expect(bonusDarkButton).toBeInTheDocument();
    expect(bonusDarkButton).toHaveStyle({
      background: 'var(--light-violet-2)',
      color: '#fff',
      fontWeight: 700,
      fontSize: '12px',
      width: '100%',
      padding: '19px 0',
      borderRadius: '15px',
      textAlign: 'center',
      cursor: 'pointer',
      margin: '20px 0'
    });
  });
});

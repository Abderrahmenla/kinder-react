import React from 'react';
import { render, screen } from '@testing-library/react';
import { BonusCard } from '../../Payment/BonusCard';

describe('BonusCard component', () => {
  test('renders a BonusCard component dialog', () => {
    render(<BonusCard icon="first" title="Title" />);
    const bonusCard = screen.getByTestId('bonus-container');
    expect(bonusCard).toBeInTheDocument();
  });

  test('renders a BonusCard containing first bonus', () => {
    render(<BonusCard icon="first" title="Title" />);
    const bonusCard = screen.getByTestId('bonus-container');
    expect(bonusCard).toBeInTheDocument();
    const firstBonusIcon = screen.getByTestId('first-bonus-icon');
    expect(firstBonusIcon).toBeInTheDocument();
  });

  test('renders a BonusCard containing second bonus', () => {
    render(<BonusCard icon="first" title="Title" />);
    const bonusCard = screen.getByTestId('bonus-container');
    expect(bonusCard).toBeInTheDocument();
    const firstBonusIcon = screen.getByTestId('first-bonus-icon');
    expect(firstBonusIcon).toBeInTheDocument();
  });

  test('renders a custom BonusCard', () => {
    render(<BonusCard ghost>Children</BonusCard>);
    const bonusCard = screen.getByTestId('bonus-container');
    expect(bonusCard).toBeInTheDocument();
    expect(screen.queryByTestId(/first-bonus-icon/i)).toBeNull();
    expect(screen.queryByTestId(/second-bonus-icon/i)).toBeNull();
  });
});

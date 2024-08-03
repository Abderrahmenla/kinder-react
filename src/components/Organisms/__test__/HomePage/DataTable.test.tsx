import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from '@/components/Organisms/HomePage/DataTable';
// Mock data for the tests
const data = [
  {
    game: 'Game1',
    player: 'Player1',
    time: '12:00',
    wager: {
      value: '100',
      icon: 'icon1.jpg'
    },
    multiplier: '2',
    payout: {
      value: '200',
      logo: 'logo1.jpg'
    }
  },
  {
    game: 'Game2',
    player: 'Player2',
    time: '13:00',
    wager: {
      value: '200',
      icon: 'icon2.jpg'
    },
    multiplier: '3',
    payout: {
      value: '600',
      logo: 'logo2.jpg'
    }
  }
];

describe('DataTable component', () => {
  test('renders correctly with data', () => {
    render(<DataTable data={data} />);
    expect(screen.getByText(/Game1/i)).toBeInTheDocument();
    expect(screen.getByText(/Player1/i)).toBeInTheDocument();
    expect(screen.getByText(/12:00/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/2x/i)).toBeInTheDocument();
    expect(screen.getByText(/Game2/i)).toBeInTheDocument();
    expect(screen.getByText(/Player2/i)).toBeInTheDocument();
    expect(screen.getByText(/13:00/i)).toBeInTheDocument();
    expect(screen.getByText(/600/i)).toBeInTheDocument();
  });
  test('renders images correctly', () => {
    render(<DataTable data={data} />);
    const wagerImage = screen.getByAltText(/wager-icon for Game1/i);
    expect(wagerImage).toBeInTheDocument();
    expect(wagerImage).toHaveAttribute('src', 'icon1.jpg');
    const payoutLogo = screen.getByAltText(/payout-logo for Game1/i);
    expect(payoutLogo).toBeInTheDocument();
    expect(payoutLogo).toHaveAttribute('src', 'logo1.jpg');
  });
});

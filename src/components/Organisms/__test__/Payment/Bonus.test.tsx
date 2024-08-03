import { render, screen } from '@testing-library/react';
import { Bonus } from '@/components/Organisms/Payment/Bonus';

describe('Bonus component', () => {
  it('renders Bonus correctly', () => {
    render(<Bonus />);
    const bonus = screen.getByTestId('bonus-main-container');
    expect(bonus).toBeInTheDocument();
  });
  it('Bonus contains all two different bonuses', () => {
    render(<Bonus />);
    const firstBonus = screen.getByText('SASINO BONUS');
    const secondBonus = screen.getByText('SPORTSBOOK BONUS');
    const thirdBonus = screen.getByText('Have a Promocode?');
    expect(firstBonus).toBeInTheDocument();
    expect(secondBonus).toBeInTheDocument();
    expect(thirdBonus).toBeInTheDocument();
  });
});

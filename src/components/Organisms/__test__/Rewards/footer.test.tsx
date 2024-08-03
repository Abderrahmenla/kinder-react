import { render, screen } from '@testing-library/react';
import { RewardsFooter } from '../../Rewards/Footer';

describe('Rewards Footer', () => {
  it('renders', () => {
    render(<RewardsFooter />);

    expect(screen.getByText('Show more information about our Bonus Program...')).toBeVisible();
    expect(screen.getByLabelText('Information Icon')).toBeVisible();
  });
});

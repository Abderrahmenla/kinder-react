import { render, screen } from '@testing-library/react';
import { BonusInvalidCode } from '../../Rewards/alerts/InvalidCode';
import userEvent from '@testing-library/user-event';

describe('Rewards bonus invalid code alert', () => {
  it('renders', () => {
    render(<BonusInvalidCode duration={1000} />);

    expect(screen.getByLabelText('Bonus Invalid Code Icon')).toBeVisible();
    expect(screen.getByText('Invalid Code!')).toBeVisible();
    expect(screen.getByLabelText('Close Icon')).toBeVisible();
  });

  it('close icon is clickable', async () => {
    render(<BonusInvalidCode duration={1000} />);

    const closeIcon = screen.getByLabelText('Close Icon');
    expect(closeIcon).toBeVisible();
    await userEvent.click(closeIcon);
  });
});

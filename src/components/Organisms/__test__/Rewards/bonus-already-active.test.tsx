import { render, screen } from '@testing-library/react';
import { BonusAlreadyActive } from '../../Rewards/alerts/BonusAlreadyActive';
import userEvent from '@testing-library/user-event';

describe('Rewards bonus already active alert', () => {
  it('renders', () => {
    render(<BonusAlreadyActive duration={1000} />);

    expect(screen.getByLabelText('Bonus Already Active Icon')).toBeVisible();
    expect(screen.getByText('Bonus Already Active!')).toBeVisible();
    expect(screen.getByLabelText('Close Icon')).toBeVisible();
  });

  it('close icon is clickable', async () => {
    render(<BonusAlreadyActive duration={1000} />);

    const closeIcon = screen.getByLabelText('Close Icon');
    expect(closeIcon).toBeVisible();
    await userEvent.click(closeIcon);
  });
});

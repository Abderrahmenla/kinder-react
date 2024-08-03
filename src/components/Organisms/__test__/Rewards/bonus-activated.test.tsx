import { render, screen } from '@/utils/test-utils';
import { BonusActivated } from '../../Rewards/alerts/BonusActivated';
import userEvent from '@testing-library/user-event';

describe('Rewards bonus activated alert', () => {
  it('renders', () => {
    render(<BonusActivated duration={1000} />);

    expect(screen.getByLabelText('Bonus Activated Success Icon')).toBeVisible();
    expect(screen.getByText('Bonus Activated!')).toBeVisible();
    expect(screen.getByLabelText('Close Icon')).toBeVisible();
  });

  it('close icon is clickable', async () => {
    render(<BonusActivated duration={1000} />);

    const closeIcon = screen.getByLabelText('Close Icon');
    expect(closeIcon).toBeVisible();
    await userEvent.click(closeIcon);
  });
});

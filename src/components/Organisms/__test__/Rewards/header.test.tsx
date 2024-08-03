import { render, screen } from '@testing-library/react';
import { RewardsHeader } from '../../Rewards/Header';
import userEvent from '@testing-library/user-event';

const onClose = jest.fn();

describe('Rewards Header', () => {
  it('renders', () => {
    render(<RewardsHeader onClose={onClose} />);
    expect(screen.getByText('Rewards')).toBeVisible();
    expect(screen.getByLabelText('Close Icon')).toBeVisible();
  });

  it('close icon is clickable', async () => {
    render(<RewardsHeader onClose={onClose} />);

    const closeIcon = screen.getByLabelText('Close Icon');
    expect(closeIcon).toBeVisible();
    await userEvent.click(closeIcon);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

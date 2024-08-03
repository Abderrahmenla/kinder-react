import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import RewardsModal from '../RewardsModal/RewardsModal';

const setOpen = jest.fn();
const promoCode = faker.string.alpha();

describe('Rewards Modal', () => {
  xit('renders', async () => {
    render(<RewardsModal open={true} setOpen={setOpen} />);

    expect(screen.getByLabelText('Rewards Modal')).toBeInTheDocument();

    expect(screen.getByLabelText('Rewards Icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Close Icon')).toBeVisible();

    expect(screen.getByText('Show more information about our Bonus Program...')).toBeVisible();
    expect(screen.getByLabelText('Information Icon')).toBeVisible();

    expect(screen.getByText('Have a Promocode?')).toBeVisible();
    const input = screen.getByRole('textbox');

    expect(input).toBeVisible();

    await userEvent.type(input, promoCode);

    expect(input).toHaveValue(promoCode);
  });

  xit('closes the modal when close icon is clicked', async () => {
    render(<RewardsModal open={true} setOpen={setOpen} />);

    const closeIcon = screen.getByLabelText('Close Icon');
    expect(closeIcon).toBeVisible();
    await userEvent.click(closeIcon);
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});

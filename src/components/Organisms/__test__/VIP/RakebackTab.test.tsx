import { render, screen } from '@testing-library/react';
import RakebackTab from '../../VIP/RakebackTab';
import { RecoilRoot } from 'recoil';

describe('RakebackTab component', () => {
  it('renders RakebackTab correctly', () => {
    render(
      <RecoilRoot>
        <RakebackTab />
      </RecoilRoot>
    );
    const claimAmountCard = screen.getByTestId('claim-amount-card');
    expect(claimAmountCard).toBeInTheDocument();
  });
});

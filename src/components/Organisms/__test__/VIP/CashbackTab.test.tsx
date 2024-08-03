import { render, screen } from '@testing-library/react';
import CashbackTab from '../../VIP/CashbackTab';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';

describe('CashbackTab component', () => {
  it('should render CashbackTab correctly', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <CashbackTab />
        </MockRouter>
      </RecoilRoot>
    );
    const cashbackContainer = screen.getByTestId('cashback-container');
    expect(cashbackContainer).toBeInTheDocument();
  });
  it('should contain CashbackTab day inputs', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <CashbackTab />
        </MockRouter>
      </RecoilRoot>
    );
    const cashbackDays = screen.getByTestId('cashback-clock-days');
    const cashbackHours = screen.getByTestId('cashback-clock-hours');
    const cashbackMinutes = screen.getByTestId('cashback-clock-minutes');
    const cashbackSeconds = screen.getByTestId('cashback-clock-seconds');
    expect(cashbackDays).toBeInTheDocument();
    expect(cashbackHours).toBeInTheDocument();
    expect(cashbackMinutes).toBeInTheDocument();
    expect(cashbackSeconds).toBeInTheDocument();
  });
});

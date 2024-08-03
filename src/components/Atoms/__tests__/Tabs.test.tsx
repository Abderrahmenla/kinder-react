import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Tabs from '../Tabs/Tabs';

const tabsOptions = [
  {
    label: 'Deposit',
    isActive: false,
    name: 'deposit'
  },
  {
    label: 'Withdrawals',
    isActive: true,
    name: 'withdrawals'
  }
];
describe('Table Compoennt', () => {
  it('should render 2 tab buttons', () => {
    render(
      <RecoilRoot>
        <Tabs tabOptions={tabsOptions} tabOnclickHandler={() => null} />
      </RecoilRoot>
    );

    const tabsElement = screen.getAllByRole('button');

    expect(tabsElement.length).toBe(2);
  });

  it('should render a tab button with "Depoist" text', () => {
    render(
      <RecoilRoot>
        <Tabs tabOptions={tabsOptions} tabOnclickHandler={() => null} />
      </RecoilRoot>
    );

    const tabsElement = screen.getByRole('button', { name: 'Deposit' });

    expect(tabsElement).toBeInTheDocument();
  });

  it('should render a tab button with "Withdrawals" text', () => {
    render(
      <RecoilRoot>
        <Tabs tabOptions={tabsOptions} tabOnclickHandler={() => null} />
      </RecoilRoot>
    );

    const tabsElement = screen.getByRole('button', { name: 'Withdrawals' });

    expect(tabsElement).toBeInTheDocument();
  });
});

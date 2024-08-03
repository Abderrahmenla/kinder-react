import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from '@/components/Organisms/Referral/DataTable/DataTable';
import { ReferredUserDataItem } from '@/components/Organisms/Referral/ReferredUsersTable.types';

const data: ReferredUserDataItem[] = [
  {
    createdDate: '2023-08-17T12:30:00.000Z',
    totalWagerAmount: 1,
    username: 'test 1'
  },
  {
    createdDate: '2023-08-17T12:30:00.000Z',
    totalWagerAmount: 2,
    username: 'test 2'
  },
  {
    createdDate: '2023-08-17T12:30:00.000Z',
    totalWagerAmount: 3,
    username: 'test 3'
  }
];

describe('DataTable component', () => {
  test('renders correctly with data', () => {
    render(<DataTable data={data} />);
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Created Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Wager Amount/i)).toBeInTheDocument();
    // expect(screen.getByText(/Referral/i)).toBeInTheDocument();
    // expect(screen.getByText(/ReferredAt/i)).toBeInTheDocument();
    // expect(screen.getByText(/Percentage/i)).toBeInTheDocument();
    // expect(screen.getByText(/Wagered/i)).toBeInTheDocument();
    // expect(screen.getByText(/Earnings/i)).toBeInTheDocument();
  });
});

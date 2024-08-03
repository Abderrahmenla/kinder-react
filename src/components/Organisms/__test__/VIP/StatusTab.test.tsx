import React from 'react';
import { render } from '@testing-library/react';
import StatusTab from '../../VIP/StatusTab';
import { RecoilRoot } from 'recoil';
import { loyaltyState } from '@/components/state/loyaltyState';

jest.mock('@/hooks/useGetLoyalty', () => ({
  useGetLoyaltyDetails: () => ({
    currencyCode: 'USD',
    nextVIPlevel: 'Silver',
    pointsNeededForCurrentVIPLevel: 100,
    pointsNeededForNextVIPLevel: 200,
    vipLevel: 'Bronze',
    vipPointsInPeriod: 50
  })
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initializeState = ({ set }: any) => {
  set(loyaltyState, {
    currencyCode: 'USD',
    nextVIPlevel: 'Gold',
    pointsNeededForCurrentVIPLevel: 100,
    pointsNeededForNextVIPLevel: 200,
    vipLevel: 'Silver',
    vipPointsInPeriod: 50
  });
};

describe('StatusTab', () => {
  test('renders with provided loyalty state', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <StatusTab />
      </RecoilRoot>
    );
  });
});

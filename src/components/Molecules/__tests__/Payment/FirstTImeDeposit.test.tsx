import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { firstTimeDepState } from '@/components/state/isFirstTimeDeposit';
import { screen } from '@testing-library/react';
import FirstTimeDeposit from '../../Payment/FirstTimeDeposit/FirstTimeDeposit';

jest.mock('recoil');
const verifySuccessFn = jest.fn();

describe('<FirstTimeDeposit />', () => {
  it('should render the FirstTimeDeposit component', () => {
    render(
      <RecoilRoot>
        <FirstTimeDeposit verifySuccessFn={verifySuccessFn} />
      </RecoilRoot>
    );
  });

  xit('should close the modal when the overlay is clicked', () => {
    const setIsFirstTimeDeposit = jest.fn();
    render(
      <RecoilRoot initializeState={(snap) => snap.set(firstTimeDepState, true)}>
        <FirstTimeDeposit verifySuccessFn={verifySuccessFn} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByTestId('overlay'));
    expect(setIsFirstTimeDeposit).toHaveBeenCalledWith(false);
  });
});

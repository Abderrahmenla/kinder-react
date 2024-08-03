/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BonusConfirmation } from '../../Rewards/alerts/BonusConfirmation';

describe('<BonusConfirmation />', () => {
  let onCloseMock: jest.Mock;
  let onConfirmMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    onConfirmMock = jest.fn();
  });

  it('should render without crashing', () => {
    const { getByText } = render(
      <BonusConfirmation onClose={onCloseMock} onConfirm={onConfirmMock} />
    );
    expect(getByText('Are you sure?')).toBeInTheDocument();
  });
});

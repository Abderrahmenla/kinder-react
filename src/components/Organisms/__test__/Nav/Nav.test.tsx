import { render, screen } from '@testing-library/react';
import React from 'react';

import { NavBar } from '../../Navbar';
import { RecoilRoot } from 'recoil';

jest.mock('next/router', () => require('next-router-mock'));

describe('NavBar', () => {
  xtest('renders correctly', () => {
    render(
      <RecoilRoot>
        <NavBar />
      </RecoilRoot>
    );

    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();

    const betNowButton = screen.getByText('Register');
    expect(betNowButton).toBeInTheDocument();
  });
});

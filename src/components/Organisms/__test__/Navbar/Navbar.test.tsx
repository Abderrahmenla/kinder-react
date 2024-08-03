import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { NavBar } from '@/components/Organisms/Navbar';

jest.mock('next/router', () => require('next-router-mock'));

describe('NavBar', () => {
  xit('it should render the logo', () => {
    render(
      <RecoilRoot>
        <NavBar />
      </RecoilRoot>
    );
    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeInTheDocument();
  });

  xit('should render sign in and bet now buttons if user is not logged in', () => {
    render(
      <RecoilRoot>
        <NavBar />
      </RecoilRoot>
    );
    const betNowButton = screen.getByText('Register');
    expect(betNowButton).toBeInTheDocument();

    const signInElement = screen.getByTestId('sign-in-text');
    expect(signInElement).toBeInTheDocument();
  });
});

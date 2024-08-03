import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import CookieBanner from '../CookieBanner';

describe('CookieBanner', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should contain the cookie policy components', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'cookies_button_accept=false'
    });

    render(
      <RecoilRoot>
        <CookieBanner />
      </RecoilRoot>
    );

    const cookiePolicyContainer = screen.getByTestId('cookie_policy');
    expect(cookiePolicyContainer).toHaveTextContent(/cookiePolicy/i);
    expect(screen.getByTestId('cookies_button_accept')).toBeInTheDocument();

    const privacyLink = screen.getByRole('link', { name: /cookiePolicyLink/i });
    expect(privacyLink).toHaveAttribute('href', '/policies/privacy');
    expect(privacyLink).toHaveTextContent(/cookiePolicyLink/i);
  });

  test('should be null when accept button is clicked', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'cookies_button_accept=false'
    });

    render(
      <RecoilRoot>
        <CookieBanner />
      </RecoilRoot>
    );

    const acceptButton = screen.queryByTestId('cookies_button_accept');
    if (!acceptButton) {
      throw new Error('Accept button not found');
    }

    fireEvent.click(acceptButton);

    expect(screen.queryByTestId('cookie_policy')).toBeNull();
    expect(screen.queryByText(/cookiePolicy/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cookiePolicyLink/i)).not.toBeInTheDocument();
    expect(acceptButton).not.toBeInTheDocument();
  });
});

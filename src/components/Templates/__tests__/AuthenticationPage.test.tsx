import React, { useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import AuthenticationPage from '@/components/Templates/AuthenticationPage';
import { openAuthPageState } from '@/components/state/openAuthPageState';
const AuthValueWrapper = ({ children }: any) => {
  const setOpenAuth = useSetRecoilState(openAuthPageState);
  setOpenAuth({ open: true });
  return children;
};

const MockHCaptcha = jest.fn().mockImplementation(({ onVerify }) => {
  useEffect(() => {
    onVerify('test-captcha-token');
  }, [onVerify]);

  return <div>Mocked Captcha</div>;
});

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: ''
    };
  }
}));

jest.mock('@hcaptcha/react-hcaptcha', () => ({
  __esModule: true,
  default: jest.fn(() => MockHCaptcha)
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

jest.mock('@/components/Organisms/Auth/ResetPassword', () => 'value');
jest.mock('@/components/Organisms/Auth/SignIn', () => 'value');
jest.mock('@/components/Organisms/Auth/Register', () => 'value');
jest.mock('../../Organisms/Auth/ForgetPassword', () => 'value');

describe('AuthenticationPage component', () => {
  it('renders properly', () => {
    render(
      <RecoilRoot>
        <AuthenticationPage handleCloseAuth={jest.fn()} />
      </RecoilRoot>
    );
    const modalWrap = screen.getByTestId('dialog');
    expect(modalWrap).toBeInTheDocument();
  });

  it('handles captcha verification', async () => {
    render(
      <RecoilRoot>
        <AuthValueWrapper>
          <AuthenticationPage handleCloseAuth={jest.fn()} />
        </AuthValueWrapper>
      </RecoilRoot>
    );
  });

  it('is not visible', () => {
    render(
      <RecoilRoot>
        <AuthenticationPage handleCloseAuth={jest.fn()} />
      </RecoilRoot>
    );
    const modalWrap = screen.getByTestId('dialog');
    expect(modalWrap).not.toBeVisible();
  });

  it('toggles between Sign in and Register', () => {
    render(
      <RecoilRoot>
        <AuthValueWrapper>
          <AuthenticationPage handleCloseAuth={jest.fn()} />
        </AuthValueWrapper>
      </RecoilRoot>
    );
    const signinLink = screen.getByText('Sign in');
    expect(signinLink).toBeInTheDocument();
    const registerLink = screen.getByText(/register/i);
    fireEvent.click(registerLink);
    expect(signinLink).toBeInTheDocument();
  });
});

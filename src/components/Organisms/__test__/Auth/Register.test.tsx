import { render, fireEvent, screen } from '@testing-library/react';
import Register from '@/components/Organisms/Auth/Register';
import { RecoilRoot } from 'recoil';
import React, { useEffect } from 'react';

const MockHCaptcha = jest.fn().mockImplementation(({ onVerify }) => {
  useEffect(() => {
    onVerify('test-captcha-token');
  }, [onVerify]);

  return <div>Mocked Captcha</div>;
});

jest.mock('@hcaptcha/react-hcaptcha', () => ({
  __esModule: true,
  default: jest.fn(() => MockHCaptcha)
}));
const handleToggle = jest.fn();

describe('Register Component', () => {
  it('updates state when input changes', () => {
    render(
      <RecoilRoot>
        <Register handleCloseAuth={handleToggle} />
      </RecoilRoot>
    );
    const usernameField = screen.getByPlaceholderText('e.g. John Doe') as HTMLInputElement;
    fireEvent.change(usernameField, { target: { value: 'NewUsername' } });
    expect(usernameField.value).toBe('NewUsername');
  });

  it('handles captcha verification', async () => {
    render(
      <RecoilRoot>
        <Register handleCloseAuth={handleToggle} />
      </RecoilRoot>
    );
  });

  it('displays error when username field is empty', () => {
    render(
      <RecoilRoot>
        <Register handleCloseAuth={handleToggle} />
      </RecoilRoot>
    );
    const usernameField = screen.getByPlaceholderText(/e.g. John Doe/i) as HTMLInputElement;
    fireEvent.blur(usernameField);
    const errorMessage = screen.getByText(/Username is required./i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error when email field is invalid', () => {
    render(
      <RecoilRoot>
        <Register handleCloseAuth={handleToggle} />
      </RecoilRoot>
    );

    const emailField = screen.getByPlaceholderText('Your@email.address') as HTMLInputElement;
    fireEvent.change(emailField, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailField);
    const errorMessage = screen.getByText(/Email format is incorrect./i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error when mobile phone field is empty', () => {
    render(
      <RecoilRoot>
        <Register handleCloseAuth={handleToggle} />
      </RecoilRoot>
    );

    const mobilePhoneField = screen.getByTestId('mobilePhone') as HTMLInputElement;
    fireEvent.blur(mobilePhoneField);

    const errorMessage = screen.getByText('mobileNumberIsRequired');
    expect(errorMessage).toBeInTheDocument();
  });
});

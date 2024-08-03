import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ForgetPassword from '@/components/Organisms/Auth/ForgetPassword';

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

describe('ForgetPassword', () => {
  test('renders email input field', () => {
    render(
      <RecoilRoot>
        <ForgetPassword />
      </RecoilRoot>
    );
    const inputElement = screen.getByPlaceholderText(/Your@email.address/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('renders submit button', () => {
    render(
      <RecoilRoot>
        <ForgetPassword />
      </RecoilRoot>
    );
    const buttonElement = screen.getByText(/send/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('email input field updates on change', () => {
    render(
      <RecoilRoot>
        <ForgetPassword />
      </RecoilRoot>
    );
    const inputElement = screen.getByPlaceholderText(/Your@email.address/i);
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
    expect(inputElement).toHaveValue('test@example.com');
  });

  test('shows error message when email format is incorrect', async () => {
    render(
      <RecoilRoot>
        <ForgetPassword />
      </RecoilRoot>
    );
    const inputElement = screen.getByPlaceholderText(/Your@email.address/i);
    fireEvent.change(inputElement, { target: { value: 'invalid_email' } });
    fireEvent.blur(inputElement);
    const errorElement = await screen.findByText(/Email format is incorrect./i);
    expect(errorElement).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import FormGroupTermsAndCondition from '@/components/Molecules/Auth/FormGroupTermAndCond';

describe('FormGroupTermsAndCondition', () => {
  test('renders the label text correctly', () => {
    render(<FormGroupTermsAndCondition />);
    const label = screen.getByText(/I agree and understand the Terms & Conditions*/i);
    expect(label).toBeInTheDocument();
  });

  test('handles checkbox changes', () => {
    const handleChange = jest.fn();
    render(<FormGroupTermsAndCondition onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  test('handles blur events', () => {
    const handleBlur = jest.fn();
    render(<FormGroupTermsAndCondition onBlur={handleBlur} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.blur(checkbox);
    expect(handleBlur).toHaveBeenCalled();
  });

  test('displays checkmark image when checked', () => {
    const handleChange = jest.fn();
    render(<FormGroupTermsAndCondition checked={true} onChange={handleChange} />);
    const checkmark = screen.getByRole('img');
    expect(checkmark).toBeInTheDocument();
  });

  test('does not display checkmark image when not checked', () => {
    const handleChange = jest.fn();
    render(<FormGroupTermsAndCondition checked={false} onChange={handleChange} />);
    const checkmark = screen.queryByTestId('checkmark');
    expect(checkmark).not.toBeInTheDocument();
  });
});

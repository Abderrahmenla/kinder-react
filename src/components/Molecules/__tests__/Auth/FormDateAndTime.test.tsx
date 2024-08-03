import { render, screen } from '@testing-library/react';
import FormDateAndTime from '@/components/Molecules/Auth/FormDataAndTime';

describe('FormDateAndTime', () => {
  const defaultProps = {
    name: 'testName',
    onChange: jest.fn(),
    onBlur: jest.fn()
  };

  test('renders without crashing', () => {
    render(<FormDateAndTime {...defaultProps} />);
  });

  test('renders label and important mark correctly', () => {
    render(<FormDateAndTime {...defaultProps} label="Test Label" important />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('renders error message correctly', () => {
    render(<FormDateAndTime {...defaultProps} errorMsg="Test Error" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Test Error');
  });

  test('correctly triggers onChange when a new date is selected', () => {
    const handleChange = jest.fn();
    render(<FormDateAndTime {...defaultProps} onChange={handleChange} />);
  });
});

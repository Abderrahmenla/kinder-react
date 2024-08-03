import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/Atoms/Input/Input';

describe('Input Component', () => {
  test('renders without crashing', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<Input value="" onChange={() => {}} size="md" />);
  });

  test('displays the provided label', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<Input label="Sample Label" size="md" value="" onChange={() => {}} />);
    expect(screen.getByText('Sample Label', { exact: false })).toBeInTheDocument();
  });

  test('displays the provided placeholder', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<Input value="" onChange={() => {}} size="md" placeholder="Enter something..." />);
    expect(screen.getByPlaceholderText('Enter something...', { exact: false })).toBeInTheDocument();
  });

  test('handles value change correctly', () => {
    const mockOnChange = jest.fn();
    render(<Input value="" size="md" placeholder="Enter something..." onChange={mockOnChange} />);
    const inputElement = screen.getByPlaceholderText('Enter something...', { exact: false });
    fireEvent.change(inputElement, { target: { value: 'New value' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('shows error message when provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<Input value="" onChange={() => {}} size="md" errorMsg="This is an error" />);
    expect(screen.getByText('This is an error', { exact: false })).toBeInTheDocument();
  });
});

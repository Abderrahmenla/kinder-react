import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateInput from '@/components/Atoms/DateInput/DateInput';

describe('DateInput Component', () => {
  test('renders without crashing', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<DateInput name="testDateInput" value="" onChange={() => {}} />);
  });

  test('displays the provided label', () => {
    render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <DateInput name="testDateInput" label="Sample Date Label" value="" onChange={() => {}} />
    );
    expect(screen.getByText('Sample Date Label')).toBeInTheDocument();
  });

  test('shows error message when provided', () => {
    render(
      <DateInput
        name="testDateInput"
        value=""
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
        errorMsg="This is a date error"
      />
    );
    expect(screen.getByText('This is a date error')).toBeInTheDocument();
  });

  test('handles day value change correctly', () => {
    const mockOnChange = jest.fn();
    render(<DateInput name="testDateInput" value="" onChange={mockOnChange} />);
    const dayInputElement = screen.getByPlaceholderText('DD');
    fireEvent.change(dayInputElement, { target: { value: '12' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('handles month value change correctly', () => {
    const mockOnChange = jest.fn();
    render(<DateInput name="testDateInput" value="" onChange={mockOnChange} />);
    const monthInputElement = screen.getByPlaceholderText('MM');
    fireEvent.change(monthInputElement, { target: { value: '5' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('handles year value change correctly', () => {
    const mockOnChange = jest.fn();
    render(<DateInput name="testDateInput" value="" onChange={mockOnChange} />);
    const yearInputElement = screen.getByPlaceholderText('YYYY');
    fireEvent.change(yearInputElement, { target: { value: '2023' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('date picker input triggers onChange when value changes', () => {
    const mockOnChange = jest.fn();
    render(<DateInput name="testDateInput" value="" onChange={mockOnChange} />);
    const dateInputElement = screen.getByTestId('dateInput');
    fireEvent.change(dateInputElement, { target: { value: '2023-05-12' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});

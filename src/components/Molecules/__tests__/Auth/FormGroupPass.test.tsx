import { render, screen, fireEvent } from '@testing-library/react';
import FormGroupPass from '@/components/Molecules/Auth/FormGroupPass';

describe('FormGroupPass', () => {
  test('renders label and input correctly', () => {
    const handleChange = jest.fn();
    render(
      <FormGroupPass
        label="Test Label"
        important={true}
        errorMsg="Test error message"
        type="text"
        name="testInput"
        value=""
        onChange={handleChange}
        placeholder="Test placeholder"
      />
    );

    const labelElement = screen.getByText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();

    const asteriskElement = screen.getByText('*');
    expect(asteriskElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(/Test placeholder/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('handles input changes', async () => {
    const handleChange = jest.fn();
    render(
      <FormGroupPass
        label="Test Label"
        important={true}
        errorMsg="Test error message"
        type="text"
        name="testInput"
        value=""
        onChange={handleChange}
        placeholder="Test placeholder"
      />
    );
    const inputElement = screen.getByPlaceholderText(/Test placeholder/i);
    fireEvent.change(inputElement, { target: { value: 'new input value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    const eventArg = handleChange.mock.calls[0][0];
    expect(eventArg.target.name).toBe('testInput');
  });

  test('displays error message when provided', () => {
    const handleChange = jest.fn();
    render(
      <FormGroupPass
        label="Test Label"
        important={true}
        errorMsg="Test error message"
        type="text"
        name="testInput"
        value=""
        onChange={handleChange}
        placeholder="Test placeholder"
      />
    );

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Test error message');
  });
});

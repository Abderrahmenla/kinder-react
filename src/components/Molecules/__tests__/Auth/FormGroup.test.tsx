import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormGroup from '@/components/Molecules/Auth/FormGroup';

describe('FormGroup', () => {
  it('renders label correctly', () => {
    render(<FormGroup label="Test Label" important type="text" name="test" placeholder="test" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders error message correctly', () => {
    render(
      <FormGroup
        label="Test Label"
        important
        type="text"
        name="test"
        placeholder="test"
        errorMsg="This field is required"
      />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('calls onChange, onFocus, onBlur handler correctly', () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    render(
      <FormGroup
        label="Test Label"
        important
        type="text"
        name="test"
        placeholder="test"
        errorMsg="This field is required"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const inputElement = screen.getByPlaceholderText('test');

    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalled();

    fireEvent.focus(inputElement);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(inputElement);
    expect(onBlur).toHaveBeenCalled();
  });
});

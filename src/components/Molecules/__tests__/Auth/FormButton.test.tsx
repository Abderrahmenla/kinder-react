import React from 'react';
import { render, screen } from '@testing-library/react';
import FormGroupButton from '@/components/Molecules/Auth/FormButton';

describe('FormGroupButton component', () => {
  test('renders FormGroupButton without crashing', () => {
    render(<FormGroupButton name="Submit" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the correct button name', () => {
    render(<FormGroupButton name="Submit" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Submit');
  });

  test('renders different button name correctly', () => {
    render(<FormGroupButton name="Cancel" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Cancel');
  });
});

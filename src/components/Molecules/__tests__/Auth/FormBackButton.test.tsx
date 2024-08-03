import React from 'react';
import { render, screen } from '@testing-library/react';
import FormBackButton from '@/components/Molecules/Auth/FormBackButton';

describe('FormBackButton component', () => {
  test('renders FormBackButton without crashing', () => {
    render(<FormBackButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the correct text content', () => {
    render(<FormBackButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('GO BACK');
  });
});

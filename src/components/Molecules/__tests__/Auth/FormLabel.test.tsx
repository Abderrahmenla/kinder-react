import React from 'react';
import { render, screen } from '@testing-library/react';
import FormLabel from '@/components/Molecules/Auth/FormLabel';

describe('FormLabel component', () => {
  test('renders FormLabel without crashing', () => {
    render(<FormLabel />);
    const labelElement = screen.getByTestId('label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders label correctly', () => {
    render(<FormLabel label="Test Label" important />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

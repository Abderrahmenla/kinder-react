import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from '../../Payment/Link';

describe('Link component', () => {
  test('renders a Link component dialog', () => {
    render(<Link href="/">Home</Link>);
    const link = screen.getByTestId('underline-link');
    expect(link).toBeInTheDocument();
  });

  test('renders a Link component with the icon', () => {
    render(<Link href="/">Home</Link>);
    const link = screen.getByTestId('underline-link');
    expect(link).toBeInTheDocument();
    const linkIcon = screen.getByTestId('underline-link-icon');
    expect(linkIcon).toBeInTheDocument();
  });
});

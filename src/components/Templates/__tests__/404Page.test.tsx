import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPageTemp from '@/components/Templates/404Page';
import { assets } from '@/config/assets';

describe('NotFoundPageTemp component', () => {
  it('renders an error image', () => {
    render(<NotFoundPageTemp />);
    const errorImage = screen.getByAltText('error-page-graphic');
    expect(errorImage).toBeInTheDocument();
    expect(errorImage).toHaveAttribute('src', `${assets}/images/404ImageTwo.svg`);
  });

  it('renders the error message', () => {
    render(<NotFoundPageTemp />);
    const errorMessage = screen.getByText(`Sorry, the page you're looking for doesn't exist!`);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the back to homepage button', () => {
    render(<NotFoundPageTemp />);
    const backButton = screen.getByText(`Back to homepage`);
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');
  });
});

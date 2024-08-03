import React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoryInfo } from '@/components/Molecules/Casino/CategoryInfo';

describe('CategoryInfo', () => {
  test('renders children correctly', () => {
    const children = 'Category information';
    render(<CategoryInfo>{children}</CategoryInfo>);
    const categoryContainer = screen.getByText(children, { exact: false });

    expect(categoryContainer).toBeInTheDocument();
  });

  test('renders with the correct props', () => {
    const children = 'Category information';
    render(<CategoryInfo>{children}</CategoryInfo>);
  });
});

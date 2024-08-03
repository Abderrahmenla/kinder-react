import React from 'react';
import { render, screen } from '@testing-library/react';
import { OutlinedButton } from '../../Payment/OutlinedButton';

describe('OutlinedButton component', () => {
  test('renders a Link component dialog', () => {
    render(<OutlinedButton>Label</OutlinedButton>);
    const button = screen.getByTestId('outlined-button');
    expect(button).toBeInTheDocument();
  });

  test('renders a OutlinedButton component styled correctly', () => {
    render(<OutlinedButton>Label</OutlinedButton>);
    const button = screen.getByTestId('outlined-button');
    expect(button).toHaveStyle({
      background: 'transparent',
      border: '1px solid #0092FF',
      color: '#0092FF',
      fontWeight: 500,
      fontSize: '11px',
      padding: '8px 42px',
      borderRadius: '58px',
      cursor: 'pointer',
      margin: '14px 0'
    });
  });
});

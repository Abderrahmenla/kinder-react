import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { ButtonComponent } from '../ButtonComponent';

describe('ButtonComponent', () => {
  test('renders a button with the specified text', () => {
    render(<ButtonComponent>Click me</ButtonComponent>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });

  test('applies variant and color', () => {
    render(
      <ButtonComponent variant="outlined" color="secondary">
        Outlined Secondary
      </ButtonComponent>
    );
    const button = screen.getByRole('button', { name: /Outlined Secondary/i });
    expect(button).toHaveClass('MuiButton-outlined MuiButton-outlinedSecondary');
  });

  test('handles button click event', () => {
    const handleClick = jest.fn();
    render(<ButtonComponent onClick={handleClick}>Click me</ButtonComponent>);
    const button = screen.getByRole('button', { name: /Click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders a button with the specified text', () => {
    render(<ButtonComponent>Click me</ButtonComponent>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });

  test('applies variant and color', () => {
    render(
      <ButtonComponent variant="outlined" color="secondary">
        Outlined Secondary
      </ButtonComponent>
    );
    const button = screen.getByRole('button', { name: /Outlined Secondary/i });
    expect(button).toHaveClass('MuiButton-outlined MuiButton-outlinedSecondary');
  });

  test('handles button click event', async () => {
    const handleClick = jest.fn();
    render(<ButtonComponent onClick={handleClick}>Click me</ButtonComponent>);
    const button = screen.getByRole('button', { name: /Click me/i });
    fireEvent.click(button);
    await new Promise((r) => setTimeout(r, 100));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

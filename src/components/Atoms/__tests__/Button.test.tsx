/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button/Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders the button text', () => {
    render(<Button>Test</Button>);
  });
  it('renders passed text', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeInTheDocument();
  });
  it('calls handleClick on button click', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button handleClick={handleClick}>Click Me</Button>);
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders icon if provided', () => {
    const icon = <svg data-testid="test-icon"></svg>;
    const { queryByTestId } = render(<Button icon={icon}>Button With Icon</Button>);
    expect(queryByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies correct class for button type', () => {
    const { container } = render(<Button variant="Secondary">Secondary Button</Button>);
    expect(container.firstChild).toHaveClass('buttonSecondary');
  });

  it('disables the button when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Click me</Button>);
    expect(getByRole('button')).toBeDisabled();
  });
});

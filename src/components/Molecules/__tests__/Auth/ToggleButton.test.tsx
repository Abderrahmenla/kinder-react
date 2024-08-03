import { render, screen, fireEvent } from '@testing-library/react';
import ToggleButton from '@/components/Molecules/Auth/ToggleButton';

describe('ToggleButton', () => {
  test('renders the button name correctly', () => {
    const name = 'Test Button';
    render(<ToggleButton name={name} />);
    const button = screen.getByText(name);
    expect(button).toBeInTheDocument();
  });

  test('handles button clicks', () => {
    const handleClick = jest.fn();
    const name = 'Test Button';
    render(<ToggleButton name={name} onClick={handleClick} />);
    const button = screen.getByText(name);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  test('button contains correct data attribute', () => {
    const name = 'Test Button';
    render(<ToggleButton name={name} />);
    const button = screen.getByText(name);
    expect(button).toHaveAttribute('data-form', name);
  });
});

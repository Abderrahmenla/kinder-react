import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '@/components/Atoms/Checkbox/Checkbox';

describe('Checkbox Component', () => {
  test('renders without crashing', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<Checkbox name="testCheckbox" checked={false} onChange={() => {}} />);
  });

  test('displays the provided label', () => {
    render(<Checkbox name="testCheckbox" label="Sample Checkbox Label" checked={false} />);
    expect(screen.getByText('Sample Checkbox Label')).toBeInTheDocument();
  });

  test('does not display the SVG icon when not checked', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<Checkbox name="testCheckbox" checked={false} onChange={() => {}} />);
    const svgElements = screen.queryByRole('svg');
    expect(svgElements).not.toBeInTheDocument();
  });

  test('handles checkbox change correctly', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox name="testCheckbox" checked={false} onChange={mockOnChange} />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(mockOnChange).toHaveBeenCalled();
  });
});

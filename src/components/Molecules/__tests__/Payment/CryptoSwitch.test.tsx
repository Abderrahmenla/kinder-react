import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CryptoSwitch from '../../Payment/CryptoSwitch';

describe('CryptoSwitch', () => {
  it('should render the component with the correct labels', () => {
    const handleChange = jest.fn();
    render(<CryptoSwitch handleChange={handleChange} />);
    expect(screen.getByText('FIAT')).toBeInTheDocument();
    expect(screen.getByText('Crypto')).toBeInTheDocument();
  });

  it('should call handleChange when button is clicked', () => {
    const handleChange = jest.fn();
    render(<CryptoSwitch handleChange={handleChange} />);
    const switcher = screen.getByTestId('crypto-switch');
    switcher && fireEvent.click(switcher);
    expect(handleChange).toHaveBeenCalled();
  });
});

import { render, screen } from '@testing-library/react';
import CalculatorComponent from '@/components/Organisms/Payment/CalculatorComponent';

describe('CalculatorComponent component', () => {
  it('renders CalculatorComponent correctly', () => {
    render(<CalculatorComponent />);
    const calculator = screen.getByTestId('calculator-container');
    expect(calculator).toBeInTheDocument();
    const calculatorText = screen.getByText('Calculator');
    expect(calculatorText).toBeInTheDocument();
  });
  it('CalculatorComponent contains the inputs', () => {
    render(<CalculatorComponent />);
    const firstInput = screen.getByTestId('calculator-amount');
    const secondInput = screen.getByTestId('calculator-crypto-amount');
    expect(firstInput).toBeInTheDocument();
    expect(secondInput).toBeInTheDocument();
  });
});

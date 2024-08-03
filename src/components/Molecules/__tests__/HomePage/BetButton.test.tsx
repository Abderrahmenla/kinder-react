import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BetButton } from '../../HomePage/BetButton';

describe('BetButton', () => {
  it('should render the BetButton component with the given text', () => {
    const text = 'Click Me!';

    render(<BetButton text={text} />);

    const betButton = screen.getByText(text);
    expect(betButton).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', () => {
    const text = 'Click Me!';
    const handleClick = jest.fn();

    render(<BetButton text={text} onClick={handleClick} />);

    fireEvent.click(screen.getByText(text));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should apply the correct styles to the button', () => {
    const text = 'Click Me!';
    const dataTestId = 'bet-button';

    render(<BetButton text={text} dataTestId={dataTestId} />);

    const button = screen.getByTestId(dataTestId);
    expect(button).toHaveStyle(`
      padding: 18px 20px 16px 20px;
      background: linear-gradient(180deg, var(--yellow) 0%, rgb(255, 189.25, 20.19) 99.48%);
      borderRadius: 58px;
      display: flex;
      minWidth: 177px;
      marginRight: 21px;
    `);
  });
});

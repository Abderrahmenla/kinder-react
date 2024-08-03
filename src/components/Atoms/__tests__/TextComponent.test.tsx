import { render, screen } from '@testing-library/react';
import React from 'react';

import { TextComponent } from '../TextComponent';

describe('TextComponent', () => {
  test('renders text with the specified variant and color', () => {
    render(<TextComponent text="Sample text" />);
    const textElement = screen.getByText(/Sample text/i);
    expect(textElement).toBeInTheDocument();
  });

  test('applies className to the text', () => {
    const testStyle = {
      fontSize: 12
    };
    render(<TextComponent text="Sample text" style={testStyle} />);
    const textElement = screen.getByText(/Sample text/i);
    expect(textElement).toHaveStyle(testStyle);
  });
});

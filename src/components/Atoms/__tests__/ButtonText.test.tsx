import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonText } from '@/components/Atoms';

describe('ButtonText', () => {
  test('renders the button label with the correct content', () => {
    const textContent = 'Button Text';
    render(<ButtonText>{textContent}</ButtonText>);

    const buttonText = screen.getByText(textContent, { exact: false });

    expect(buttonText).toBeInTheDocument();
  });
});

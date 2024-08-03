import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameFrame } from '@/components/Atoms/GameFrame/GameFrame';

describe('GameFrame', () => {
  const mockProps = {
    id: 'game-frame-id',
    src: 'https://example.com/game'
  };

  test('renders the component with correct id and src', () => {
    render(<GameFrame {...mockProps} />);
    const iframeElement = screen.getByTestId('iframe', {});

    expect(iframeElement).toHaveAttribute('id', mockProps.id);
    expect(iframeElement).toHaveAttribute('src', mockProps.src);
  });

  test('renders the component with allowFullScreen attribute', () => {
    render(<GameFrame {...mockProps} />);
    const iframeElement = screen.getByTestId('iframe', {});

    expect(iframeElement).toHaveAttribute('allowFullScreen');
  });
});

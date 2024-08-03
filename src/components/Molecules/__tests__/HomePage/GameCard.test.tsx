import React from 'react';
import { render, screen } from '@testing-library/react';

import { GameCard } from '../../HomePage/GameCard';

describe('GameCard', () => {
  const imageSrc = 'test-image.jpg';
  const text = 'Test Game';

  it('should render the GameCard with the provided text and image', () => {
    render(<GameCard imageSrc={imageSrc} text={text} />);

    const gameCardText = screen.getByText(text);
    expect(gameCardText).toBeInTheDocument();

    const zoomImageContainer = screen.getByTestId('zoom-image-container');
    expect(zoomImageContainer).toHaveStyle(`backgroundImage: url(${imageSrc})`);
  });
});

import { render, screen } from '@testing-library/react';
import { GameCardSection } from '@/components/Organisms/HomePage/GameCardSection';

describe('GameCardSection component', () => {
  const props = {
    imageSrc: 'gameCardImage.jpg',
    iconSrc: 'icon.jpg',
    text: 'Game Information',
    infoSrc: 'info.jpg',
    heading: 'Game Heading',
    href: 'sports'
  };
  it('renders the GameCard correctly', () => {
    render(<GameCardSection {...props} />);
    const gameCardImage = screen.getByTestId('zoom-image-container');
    expect(gameCardImage).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';

import { LiveButton } from '../../HomePage/LiveButton';

describe('LiveButton', () => {
  it('should render the LiveButton component with the given image and text', () => {
    render(<LiveButton />);

    const playImage = screen.getByAltText('play');
    expect(playImage).toBeInTheDocument();
    expect(playImage).toHaveAttribute('src', `/assets/images/play.svg`);

    const liveText = screen.getByText('Live Bets');
    expect(liveText).toBeInTheDocument();
  });

  it('should render the LiveText with correct styles', () => {
    render(<LiveButton />);

    const liveText = screen.getByText('Live Bets');
    expect(liveText).toHaveStyle({
      color: 'var(--white)',
      fontSize: 'var(--font-size-14)',
      lineHeight: 'var(--l-height-16)',
      fontWeight: 700,
      cursor: 'pointer',
      marginLeft: '7px'
    });
  });
});

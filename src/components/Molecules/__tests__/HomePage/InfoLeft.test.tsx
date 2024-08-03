import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfoLeft } from '../../HomePage/InfoLeft';

describe('InfoLeft', () => {
  it('should render the InfoLeft component with the correct iconSrc and text', () => {
    const iconSrc = '/path/to/sample/icon.png';
    const textValue = 'Sample Text';

    render(<InfoLeft iconSrc={iconSrc} text={textValue} />);

    const imageElement = screen.getByAltText('icon');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', iconSrc);

    const textElement = screen.getByText(textValue);
    expect(textElement).toBeInTheDocument();
  });
});

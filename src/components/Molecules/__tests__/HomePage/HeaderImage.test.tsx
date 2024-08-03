// HeaderImage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeaderImage } from '../../HomePage/HeaderImage';

describe('HeaderImage', () => {
  it('should render the HeaderImage with the correct alt and src attributes', () => {
    const altText = 'Sample Alt Text';
    const srcValue = '/path/to/sample/image.png';

    render(<HeaderImage alt={altText} src={srcValue} />);

    const headerImage = screen.getByAltText(altText);
    expect(headerImage).toBeInTheDocument();
    expect(headerImage).toHaveAttribute('src', srcValue);
  });

  it('should render the HeaderImage with the correct styles', () => {
    const altText = 'Sample Alt Text';
    const srcValue = '/path/to/sample/image.png';

    render(<HeaderImage alt={altText} src={srcValue} />);

    const headerImage = screen.getByAltText(altText);
    expect(headerImage).toHaveStyle(`
      height: auto;
      vertical-align: middle;
    `);
  });
});

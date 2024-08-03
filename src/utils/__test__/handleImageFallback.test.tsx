import { render, screen } from '@testing-library/react';
import ImageWithFallback from '@/utils/handleImageFallback';
import React from 'react';

describe('ImageWithFallback', () => {
  test('renders fallback image when source image fails to load', () => {
    const src = '/path/to/source-image.jpg';
    const fallbackSrc = '/path/to/fallback-image.jpg';
    const placeholderSrc = '/path/to/placeholder-image.jpg';
    const altText = 'Test Image';
    const href = '/';

    render(
      <ImageWithFallback
        src={src}
        href={href}
        fallbackSrc={fallbackSrc}
        placeholderSrc={placeholderSrc}
        alt={altText}
        width={100}
        height={100}
      />
    );

    const sourceImage = screen.getByAltText(altText, { exact: false });
    expect(sourceImage).toBeInTheDocument();

    sourceImage.onerror?.(new Event('error'));

    const fallbackImage = screen.getByRole('img', {});
    expect(fallbackImage).toBeInTheDocument();
  });
});

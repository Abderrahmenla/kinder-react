/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonIcon } from '../ButtonIcon';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  }
}));

describe('ButtonIcon', () => {
  test('renders correctly', () => {
    const src = '/path-to-your-test-image.png';
    const width = 15;
    const height = 15;

    render(<ButtonIcon src={src} width={width} height={height} />);

    const buttonIcon = screen.getByTestId('button-icon') as HTMLImageElement;

    expect(buttonIcon).toBeInTheDocument();
    expect(buttonIcon.src).toContain(src);
    expect(buttonIcon.width).toEqual(width);
    expect(buttonIcon.height).toEqual(height);
  });
});

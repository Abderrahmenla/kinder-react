import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GamePromo } from '@/components/Atoms/GamePromo/GamePromo';

test('GamePromo renders correctly', async () => {
  const href = '/game';
  const src = '/image.jpg';
  const alt = 'Game Promo';
  const fill = true;

  render(<GamePromo href={href} src={src} alt={alt} fill={fill} />);

  const image = screen.getByAltText(alt);
  expect(image).toBeInTheDocument();

  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', href);

  await userEvent.click(link);
});

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import SocialMediaLinks from '@/components/Molecules/Footer/SocialMediaLinks/SocialMediaLinks';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';

describe('SocialMediaLinks', () => {
  it('renders correct number of social media links', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <SocialMediaLinks />
        </MockRouter>
      </RecoilRoot>
    );

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(4);
  });

  it('renders each link with correct attributes', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <SocialMediaLinks />
        </MockRouter>
      </RecoilRoot>
    );

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      const { getByTestId } = within(link);
      const image = getByTestId('social-media-icon');
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('src')).toBeTruthy();
    });
  });
});

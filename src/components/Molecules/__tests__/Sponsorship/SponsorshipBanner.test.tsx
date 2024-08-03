import React from 'react';
import { render, screen } from '@testing-library/react';
import SponsorshipBanner from '../../Sponsorship/SponsorshipBanner';

const mockBannerObj = {
  imageUrl:
    'https://ratty-obnoxious-drink.media.strapiapp.com/desktop_sponsor_banner_dbaaf3ff4f.png',
  altText: 'desktop-sponsor-banner-image',
  subtitle: 'The Journey of MMA Fighter Dan Hooker with Spin Bet Sponsorship',
  title: 'Dan The Hangman" Hooker'
};

describe('Sponsorship Banner Test', () => {
  it('should render banner title', () => {
    render(<SponsorshipBanner banner={mockBannerObj} />);

    const element = screen.getByTestId('banner-title');
    expect(element).toBeInTheDocument();
  });

  it('should render banner body text', () => {
    render(<SponsorshipBanner banner={mockBannerObj} />);

    const element = screen.getByTestId('banner-body-text');
    expect(element).toBeInTheDocument();
  });

  it('should render banner footer text', () => {
    render(<SponsorshipBanner banner={mockBannerObj} />);

    const element = screen.getByTestId('banner-footer-text');
    expect(element).toBeInTheDocument();
  });
});

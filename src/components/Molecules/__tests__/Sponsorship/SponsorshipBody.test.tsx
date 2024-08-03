import React from 'react';
import { render, screen } from '@testing-library/react';
import SponsorshipBody from '../../Sponsorship/SponsorshipBody';

const mockSponsorshipContentWithVideo = {
  Title: 'A Glimpse into the Future',
  Text: "The article would conclude by examining the potential impact of the Dan Hooker and Spin Bet partnership on the future of MMA sponsorships. As the sports industry continues to evolve, collaborations like these could set a precedent for how companies invest in athletes' success, both professionally and personally.",
  Image: {
    __typename: 'UploadFileEntityResponse',
    data: {
      __typename: 'UploadFileEntity',
      id: '102',
      attributes: {
        __typename: 'UploadFile',
        alternativeText: 'sponsor-hooker-video',
        url: 'https://ratty-obnoxious-drink.media.strapiapp.com/sponsor_hooker_a9b3244dc9.mp4'
      }
    }
  }
};

const mockSponsorshipContentWithImage = {
  Title: 'From the Octagon to the Spotlight',
  Text: "Dan Hooker's rise in the MMA world has been nothing short of remarkable. Known for his striking abilities and relentless work ethic, Hooker's journey from humble beginnings to competing on the international stage has inspired countless aspiring fighters. However, the path to success is often laden with challenges, and securing a reliable sponsorship can be a turning point for any athlete",
  Image: {
    __typename: 'UploadFileEntityResponse',
    data: {
      __typename: 'UploadFileEntity',
      id: '78',
      attributes: {
        __typename: 'UploadFile',
        alternativeText: 'sponsor-row-1-image',
        url: 'https://ratty-obnoxious-drink.media.strapiapp.com/sponsor_row_1_35f55c9d70.png'
      }
    }
  }
};

describe('Sponsorship Content Test', () => {
  it('should render an image', () => {
    render(<SponsorshipBody asset={mockSponsorshipContentWithImage} index={1} />);

    const element = screen.getByTestId('sponsorship-media-1-image');
    expect(element).toBeInTheDocument();
  });

  it('should render a video', () => {
    render(<SponsorshipBody asset={mockSponsorshipContentWithVideo} index={1} />);

    const element = screen.getByTestId('sponsorship-media-1-video');
    expect(element).toBeInTheDocument();
  });

  it('should render a title', () => {
    render(<SponsorshipBody asset={mockSponsorshipContentWithVideo} index={1} />);

    const element = screen.getByTestId('sponsorship-rowcontent-1-title');
    expect(element).toBeInTheDocument();
  });

  it('should render a subtitle', () => {
    render(<SponsorshipBody asset={mockSponsorshipContentWithVideo} index={1} />);

    const element = screen.getByTestId('sponsorship-rowcontent-1-subtitle');
    expect(element).toBeInTheDocument();
  });
});

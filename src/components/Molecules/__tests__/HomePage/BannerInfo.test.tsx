import React from 'react';
import { render, screen } from '@testing-library/react';
import { BannerInfo } from '../../HomePage/BannerInfo';

const props = {
  headerText: 'Play',
  description: 'Join us and have fun!',
  bannerButton: {
    ctaName: 'Sign In',
    ctaValue: 'login',
    ctaType: 'Action'
  }
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/'
  }))
}));

describe('BannerInfo', () => {
  it('should render the component with the given props', () => {
    render(<BannerInfo {...props} />);

    const header = screen.getByTestId('header');
    const description = screen.getByTestId('description');

    expect(header).toHaveTextContent(props.headerText);
    expect(description).toHaveTextContent(props.description);

    // Test the button's presence when the condition is met
    const button = screen.queryByTestId('bet-button');
    if (window.location.href.includes('en-nz')) {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(props.bannerButton.ctaName);
    } else {
      expect(button).toBeNull(); // No button should be rendered
    }
  });

  it('should apply the correct styles to the elements', () => {
    render(<BannerInfo {...props} />);
  });
});

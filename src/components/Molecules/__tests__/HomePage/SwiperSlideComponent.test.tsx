import React from 'react';
import { render, screen } from '@testing-library/react';
import { SwiperSlideComponent } from '../../HomePage/SwiperSlideComponent';

describe('SwiperSlideComponent', () => {
  it('should render a video element with correct attributes', () => {
    const src = 'https://example.com/sample-video.mp4';

    render(<SwiperSlideComponent src={src} />);

    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;
    const sourceElement = screen.getByTestId('source-element') as HTMLSourceElement;

    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveProperty('muted', true);
    expect(videoElement.hasAttribute('playsinline')).toBeTruthy();
    expect(sourceElement).toHaveAttribute('src', src);
    expect(sourceElement).toHaveAttribute('type', 'video/mp4');
  });

  it('should apply the correct styles to the video element', () => {
    const src = 'https://example.com/sample-video.mp4';

    render(<SwiperSlideComponent src={src} />);

    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;

    expect(videoElement).toHaveStyle({ objectFit: 'cover' });
    expect(videoElement).toHaveStyle({ width: '100%' });
    expect(videoElement).toHaveStyle({ height: '100%' });
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';

import { InfoRight } from '../../HomePage/InfoRight';

describe('InfoRight', () => {
  it('should render the InfoRight component with the given image', () => {
    const infoSrc = '/path/to/sample/info-icon.png';

    render(<InfoRight infoSrc={infoSrc} />);

    const infoImage = screen.getByAltText('information');
    expect(infoImage).toBeInTheDocument();
    expect(infoImage).toHaveAttribute('src', infoSrc);
  });

  it('should render the InfoRightContainer and InfoImage with correct styles', () => {
    const infoSrc = '/path/to/sample/info-icon.png';

    render(<InfoRight infoSrc={infoSrc} />);

    const infoRightContainer = screen.getByTestId('info-right-container');
    expect(infoRightContainer).toHaveStyle({
      background: 'rgb(38, 23, 75)',
      borderRadius: '0 0 15px 15px',
      width: '50px',
      display: 'flex',
      justifyContent: 'center',
      padding: '12px 0 14px 0',
      alignItems: 'center'
    });

    const infoImage = screen.getByAltText('information');
    expect(infoImage).toHaveStyle({
      width: '20px',
      height: 'auto'
    });
  });
});

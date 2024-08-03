import React, { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import VIPBanner from '../../VIP/VIPBanner';
import { Steps } from '@/components/Molecules/VIP/Steps/Steps';
import { VipLevelTitles } from '@/components/Molecules/VIP/Level/Level';
import { RecoilRoot } from 'recoil';

const loyaltyDetails = {
  vipLevel: 'Gold',
  vipPointsInPeriod: 50,
  pointsNeededForNextVIPLevel: 100,
  bonusPoints: 10,
  currencyCode: 'USD',
  currentVIPLevelQualificationDate: new Date('2024-02-23'),
  currentVIPLevelSustainmentDate: new Date('2024-02-23'),
  localizedVIPLevel: 'Localized Gold',
  manuallySetVIPLevel: null,
  nextLevelQualificationDate: new Date('2024-03-23'),
  nextVIPLevelStatus: 1,
  nextVIPlevel: 'Next Level',
  pointsBalance: 200,
  pointsExpireOn: new Date('2025-01-01'),
  pointsNeededForCurrentVIPLevel: 80,
  pointsRedemptionBlocked: false,
  redemptionRate: 0.05,
  totalVIPPoints: 500
};

const stepsData = [
  {
    Title: 'Step 1',
    Text: 'Description for Step 1',
    Image: {
      data: {
        attributes: {
          url: 'path/to/step1-image.jpg',
          alternativeText: 'Step 1 Image Alt Text',
          mimetype: 'image/jpeg',
          mime: 'image/jpeg'
        }
      }
    }
  }
];

jest.mock('swiper/react', () => {
  const MockSwiper: React.FC<{ children: ReactNode }> = ({ children }) => <div>{children}</div>;
  const MockSwiperSlide: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div>{children}</div>
  );

  return {
    Swiper: MockSwiper,
    SwiperSlide: MockSwiperSlide
  };
});

describe('Components', () => {
  it('should render VIPBanner component', () => {
    render(
      <RecoilRoot>
        <VIPBanner
          isAuthenticated={true}
          loyaltyDetails={loyaltyDetails}
          rightImage="path-to-image"
        />
      </RecoilRoot>
    );

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it('should render Steps component', () => {
    render(
      <RecoilRoot>
        <Steps data={stepsData} />
      </RecoilRoot>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Description for Step 1')).toBeInTheDocument();
  });

  it('should call onTitleClick when a title is clicked', () => {
    const mockOnTitleClick = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(
      <RecoilRoot>
        <VipLevelTitles onTitleClick={mockOnTitleClick} VIPLevelTitles={['all']} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText(/all/i));

    expect(mockOnTitleClick).toHaveBeenCalledWith('all');
  });
});

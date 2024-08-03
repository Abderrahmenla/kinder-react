import { render, screen } from '@testing-library/react';
import { Level, Stars } from '@/components/Organisms/Drawer/menuData/data';
import LoggedInStatsCard from '../../Drawer/LoggedInStatsCard';

jest.mock('next/image', () => {
  // eslint-disable-next-line @next/next/no-img-element, react/display-name, @typescript-eslint/no-explicit-any
  return ({ src, alt, ...rest }: any) => <img src={src} alt={alt} {...rest} />;
});

describe('LoggedInStatsCard', () => {
  const dummyData = {
    firstName: 'John',
    level: {
      icon: `/assets/images/star.svg`,
      name: Level.STARTER
    },
    percentage: 50,
    stars: {
      icon: `/assets/images/star_bronze.svg`,
      name: Stars.BRONZE
    },
    starterBadge: `/assets/images/starter.svg`
  };

  it('renders without crashing', () => {
    render(<LoggedInStatsCard />);
  });

  it('displays the user name', () => {
    render(<LoggedInStatsCard userInfo={dummyData} />);
    const name = screen.getByText(dummyData.firstName);
    expect(name).toBeInTheDocument();
  });

  it('displays the correct progress percentage', () => {
    render(<LoggedInStatsCard userInfo={dummyData} />);
    const percentage = screen.getByText(dummyData.percentage + '%');
    expect(percentage).toBeInTheDocument();
  });
});

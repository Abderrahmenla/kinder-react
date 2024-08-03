import { HomeBanner } from './Home.style';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { HomepageContentProps } from './Homepage.type';
import CarouselComponent from '../../Organisms/HomePage/CarouselComponent/CarouselComponent';
import MemoizedVerticalAssets from '@/components/Organisms/HomePage/VerticalAssets/VerticalAssets';
import MemoizedPaymentLogos from '@/components/Organisms/HomePage/PaymentLogos/PaymentLogos';
import HomeVIPBadge from '@/components/Organisms/HomePage/HomeVipBadge/HomeVIPBadge';
import { Level } from '@/graphql/types/vipProgramsTypes';

const Home: React.FC<{
  homepageContent: HomepageContentProps;
  vipProgramsLevel: Level[];
}> = ({ homepageContent, vipProgramsLevel }) => {
  const { isAuthenticated } = useRecoilValue(authState);

  return (
    <HomeBanner>
      <CarouselComponent banners={homepageContent && homepageContent.bannersv2s.data} />
      {isAuthenticated && <HomeVIPBadge vipProgramsLevel={vipProgramsLevel} />}
      <MemoizedVerticalAssets assets={homepageContent && homepageContent.Verticals} />
      <MemoizedPaymentLogos logos={homepageContent && homepageContent.PaymentLogos} />
    </HomeBanner>
  );
};

export default Home;

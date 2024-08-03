import React from 'react';
import { loyaltyState } from '@/components/state/loyaltyState';
import { useRecoilValue } from 'recoil';
import { Level } from '@/graphql/types/vipProgramsTypes';
import {
  HomeVIPBadgeContainer,
  VIPBadge,
  VIPBadgeBanner,
  VIPBadgeContainer
} from './HomeVIPBadge.style';
import Image from 'next/image';
import { UseMediaQuery } from '@/hooks/useMediaQuery';

const HomeVIPBadge: React.FC<{ vipProgramsLevel: Level[] }> = ({ vipProgramsLevel }) => {
  const loyaltyDetails = useRecoilValue(loyaltyState);
  const isMobile = UseMediaQuery(768);
  // Find the sublevel icon
  let sublevelIconUrl = '';
  if (loyaltyDetails && vipProgramsLevel) {
    for (const level of vipProgramsLevel) {
      for (const sublevel of level.SubLevels) {
        if (sublevel.Level === loyaltyDetails.nextVIPlevel) {
          sublevelIconUrl = sublevel?.Icon?.data?.attributes.url as string;
          break; // Break out of the inner loop if a match is found
        }
      }
      if (sublevelIconUrl) break; // Break out of the outer loop if a match is found
    }
  }

  return (
    <HomeVIPBadgeContainer>
      <VIPBadgeContainer>
        <VIPBadge sublevelIconUrl={sublevelIconUrl} loyaltyDetails={loyaltyDetails} />
      </VIPBadgeContainer>
      {!isMobile && (
        <VIPBadgeBanner>
          <Image src={sublevelIconUrl} alt="level" width={222} height={223} />
        </VIPBadgeBanner>
      )}
    </HomeVIPBadgeContainer>
  );
};

export default HomeVIPBadge;

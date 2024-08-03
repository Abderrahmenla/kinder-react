import { useRecoilValue } from 'recoil';
import { loyaltyState } from '@/components/state/loyaltyState';
import { Level } from '@/graphql/types/vipProgramsTypes';

export const useLoyaltySublevelIcon = (levels: Level[]): string => {
  const loyaltyDetails = useRecoilValue(loyaltyState);
  let sublevelIconUrl = '';

  if (loyaltyDetails && levels && levels.length) {
    levelLoop: for (const level of levels) {
      for (const sublevel of level.SubLevels) {
        if (sublevel.Level === loyaltyDetails.nextVIPlevel) {
          sublevelIconUrl = sublevel.Icon.data?.attributes.url ?? '';
          break levelLoop; // Break out of both loops if a match is found
        }
      }
    }
  }

  return sublevelIconUrl;
};

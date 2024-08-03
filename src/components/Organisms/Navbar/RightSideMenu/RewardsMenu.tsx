import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { openRewardsModalState } from '@/components/state/openRewardsModalState';
import { assets } from '@/config/assets';
import { IconHeaderContainer } from '../NavBarStyles';

type RewardsMenuType = {
  isAuthenticated: boolean;
};

export const RewardsMenu: React.FC<RewardsMenuType> = ({ isAuthenticated }) => {
  const setOpenRewards = useSetRecoilState(openRewardsModalState);

  return (
    <IconHeaderContainer
      isAuthenticated={isAuthenticated}
      onClick={() => setOpenRewards({ open: true })}
    >
      <Image
        src={`${assets}/images/loggedIn-profile-images/rewards-desktop.svg`}
        width={24}
        height={24}
        alt="rewards icon"
        loading="lazy"
      />
    </IconHeaderContainer>
  );
};

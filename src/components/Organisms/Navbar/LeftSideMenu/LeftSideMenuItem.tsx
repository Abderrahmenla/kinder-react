import { assets } from '@/config/assets';
import {
  IconRakebackHeaderContainer,
  LeftSideMenuContainer,
  LogoContainer,
  RakeBackNotification
} from '../NavBarStyles';
import Image from 'next/image';
import { Rakeback } from './Rackback';
import { useMediaQuery } from 'usehooks-ts';
import { useGameStatusContext } from 'src/providers/GameStatusProvider';
import { useRecoilState, useRecoilValue } from 'recoil';
import { rakebackToggleState } from '@/components/state/rakebackToggleState';
import { loyaltyState } from '@/components/state/loyaltyState';

interface LeftSideMenuItemType {
  isCasinoLink: string;
  handleLogoClick: () => void;
  isAuthenticated: boolean;
  isMobile: boolean;
  claimRewards: () => void;
  claimButtonLoading: boolean;
}

export const LeftSideMenuItem = ({
  isCasinoLink,
  handleLogoClick,
  isAuthenticated = false,
  claimRewards,
  isMobile,
  claimButtonLoading
}: LeftSideMenuItemType) => {
  const [isRakeback, setRakeback] = useRecoilState(rakebackToggleState);
  const loyaltyDetails = useRecoilValue(loyaltyState);
  const { isPlaying } = useGameStatusContext();
  const isMobile1040 = useMediaQuery('(max-width:1040px)');
  const isMobile991 = useMediaQuery('(max-width:991px)');
  const isGreaterThanZero = loyaltyDetails && loyaltyDetails?.pointsBalance > 0;
  const logoImageSrc =
    isPlaying && isMobile && isAuthenticated
      ? `${assets}/images/spinbetNameAndLogo.svg`
      : isMobile && isAuthenticated
      ? `${assets}/images/spin-bet-logo-img.svg`
      : `${assets}/images/spinbetNameAndLogo.svg`;

  const logoImageWidth =
    isPlaying && isMobile991 && isAuthenticated
      ? 120
      : isMobile && isAuthenticated
      ? 30
      : isMobile
      ? 98
      : 120;

  return (
    <LeftSideMenuContainer>
      <LogoContainer
        href={isCasinoLink}
        onClick={handleLogoClick}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
      >
        <Image src={logoImageSrc} alt="Logo" height={48} width={logoImageWidth} />
      </LogoContainer>

      <Rakeback
        loyaltyDetails={loyaltyDetails}
        isLoadingLoyaltyDetails={loyaltyDetails == undefined}
        isAuthenticated={isAuthenticated && isRakeback}
        isMobile={isMobile1040}
        isRakeBack={isRakeback}
        claimButtonLoading={claimButtonLoading}
        claimRewards={claimRewards}
        handleSetRakeback={() => setRakeback((isRake) => !isRake)}
      />

      {(isPlaying && isMobile991) ||
        (!isRakeback && (
          <IconRakebackHeaderContainer
            isRakeback={isRakeback}
            isAuthenticated={isAuthenticated}
            onClick={() => setRakeback((isRake) => !isRake)}
          >
            <RakeBackNotification isDisplay={isGreaterThanZero} />
            <Image src={`${assets}/images/rake.png`} width={24} height={24} alt="Coins" />
          </IconRakebackHeaderContainer>
        ))}
    </LeftSideMenuContainer>
  );
};

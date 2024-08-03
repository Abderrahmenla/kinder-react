import { useCallback } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import {
  Banner,
  LeftBannerSide,
  CenterBannerSide,
  RightBannerSide,
  WelcomeInfo,
  WelcomeText,
  WelcomeTopic,
  LogutBanner,
  LogoutTitle,
  LogoutSubtitle,
  LogoutButton
} from './VIPBanner.styles';
import { assets } from '@/config/assets';
import { loyaltyData } from '@/hooks/types/loyaltyData';
import RewardWrapper from '../Rewards/RewardWrapper';
import { useTranslations } from '@/hooks/useTranslations';
import { useSetRecoilState } from 'recoil';
import { openToggleAuthState } from '@/components/state/openToggleAuthState';
import { openAuthPageState } from '@/components/state/openAuthPageState';

const VIPBanner = ({
  rightImage,
  rightImageWidth,
  isAuthenticated,
  headline,
  subtitle,
  loyaltyDetails,
  sublevelIconUrl
}: {
  rightImage?: string;
  rightImageWidth?: number;
  isAuthenticated?: boolean;
  headline?: string;
  subtitle?: string;
  loyaltyDetails?: loyaltyData;
  sublevelIconUrl?: string;
}) => {
  const isAbove600 = useMediaQuery('(min-width:600px)');
  const { t } = useTranslations();
  const setToggleAuthState = useSetRecoilState(openToggleAuthState);
  const setOpenAuthState = useSetRecoilState(openAuthPageState);

  const handleOpenSignIn = useCallback(() => {
    setToggleAuthState({ toggle: 'signin' });
    setOpenAuthState({ open: true });
  }, [setToggleAuthState, setOpenAuthState]);

  const renderAuthenticatedContent = () =>
    loyaltyDetails && (
      <>
        <LeftBannerSide>
          <RewardWrapper sublevelIconUrl={sublevelIconUrl} loyaltyDetails={loyaltyDetails} />
        </LeftBannerSide>
        <CenterBannerSide>
          <WelcomeInfo>
            <WelcomeTopic>{headline || `${t('welcome')}, !`}</WelcomeTopic>
            <WelcomeText>{subtitle || `${t('itsGreatToHaveYouHere')}`}</WelcomeText>
          </WelcomeInfo>
        </CenterBannerSide>
        {isAbove600 && (
          <RightBannerSide style={{ width: rightImageWidth, height: rightImageWidth }}>
            <Image
              src={rightImage || `${assets}/images/logo3D.png`}
              alt="Award"
              fill={true}
              style={{ objectFit: 'contain' }}
            />
          </RightBannerSide>
        )}
      </>
    );

  const renderUnauthenticatedContent = () => (
    <>
      <LogoutTitle size="h3" type="Heading">
        {t('enjoyAPremiumVipExperience')}
      </LogoutTitle>
      <LogoutSubtitle>{t('vipProgramIsDesigned')}</LogoutSubtitle>
      <LogoutButton onClick={handleOpenSignIn}>
        <span>{t('loginToUnlockTheVip')}</span>
      </LogoutButton>
    </>
  );

  return isAuthenticated && loyaltyDetails ? (
    <Banner>{renderAuthenticatedContent()}</Banner>
  ) : (
    <LogutBanner>{renderUnauthenticatedContent()}</LogutBanner>
  );
};
export default VIPBanner;

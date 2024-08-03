import { getLevelColor } from '@/components/Atoms/GetLoyaltySettings';
import {
  ProgressBar,
  ProgressBarBackground,
  ProgressBarContainer
} from '@/components/Molecules/Drawer/LoggedInStatsCard';
import { loyaltyState } from '@/components/state/loyaltyState';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import {
  AwardWrapper,
  Awards,
  HomeBanner,
  LeftBannerSide,
  MoneyForNextStep,
  MoneyInAccount,
  NextAward,
  ProgressInfo,
  ProgressPercent,
  ProgressTopic,
  ReceivedAward,
  ReceivedText,
  RightBannerSide,
  WelcomeInfo,
  WelcomeText,
  WelcomeTopic
} from './MainBanner.style';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';

const MainBanner = ({
  rightImage,
  rightImageWidth,
  isAuthenticated,
  headline,
  subtitle
}: {
  rightImage?: string;
  rightImageWidth?: number;
  isAuthenticated?: boolean;
  headline?: string;
  subtitle?: string;
}) => {
  const isAbove480 = useMediaQuery('(min-width:480px)');
  const loyaltyDetails = useRecoilValue(loyaltyState);

  const currency = '$';
  const vipLevelColor = loyaltyDetails && getLevelColor(loyaltyDetails.vipLevel);
  const nextVIPlevelColor = loyaltyDetails && getLevelColor(loyaltyDetails.nextVIPlevel);
  const percentage = loyaltyDetails
    ? (
        ((loyaltyDetails.vipPointsInPeriod || 0) * 100) /
        loyaltyDetails.pointsNeededForNextVIPLevel
      ).toFixed(2)
    : null;
  const percentageToNumber = Number(percentage);
  const { t } = useTranslations();
  return (
    <HomeBanner>
      <LeftBannerSide>
        <WelcomeInfo>
          <WelcomeTopic>{headline || `Welcome, !`}</WelcomeTopic>
          <WelcomeText>{subtitle || `It's great to have you here.`}</WelcomeText>
        </WelcomeInfo>
        {isAuthenticated && loyaltyDetails ? (
          <ProgressInfo>
            <ProgressTopic>Your VIP Progress:</ProgressTopic>
            <ProgressPercent>{percentage} %</ProgressPercent>
            <ProgressBarContainer>
              <ProgressBarBackground style={{ width: '100%' }}>
                <ProgressBar percentage={percentageToNumber} />
              </ProgressBarBackground>
            </ProgressBarContainer>
            <Awards>
              <AwardWrapper>
                <ReceivedAward>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill={vipLevelColor}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '4px' }}
                  >
                    <path
                      d="M7.75912 1.2406C8.09618 0.407151 9.27619 0.40715 9.61324 1.2406L11.2284 5.23434C11.3716 5.58856 11.7042 5.83018 12.0853 5.85696L16.3827 6.1589C17.2795 6.22191 17.6442 7.34417 16.9557 7.92228L13.6565 10.6925C13.3639 10.9382 13.2368 11.3291 13.3292 11.6999L14.37 15.8803C14.5872 16.7527 13.6325 17.4462 12.8699 16.9701L9.21582 14.6884C8.89172 14.4861 8.48064 14.4861 8.15655 14.6884L4.50242 16.9701C3.73985 17.4462 2.78521 16.7527 3.00241 15.8803L4.04321 11.6999C4.13552 11.3291 4.00849 10.9382 3.71588 10.6925L0.416702 7.92228C-0.271796 7.34417 0.0928442 6.22191 0.989655 6.1589L5.28703 5.85696C5.66818 5.83018 6.00075 5.58856 6.144 5.23434L7.75912 1.2406Z"
                      fill={vipLevelColor}
                    ></path>
                  </svg>
                  <ReceivedText color={vipLevelColor}>{loyaltyDetails.vipLevel}</ReceivedText>
                </ReceivedAward>
                <MoneyInAccount>
                  Wagered {currency}
                  {loyaltyDetails.pointsNeededForCurrentVIPLevel}
                </MoneyInAccount>
              </AwardWrapper>
              <AwardWrapper>
                <NextAward>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '4px' }}
                  >
                    <path
                      d="M7.75912 1.2406C8.09618 0.407151 9.27619 0.40715 9.61324 1.2406L11.2284 5.23434C11.3716 5.58856 11.7042 5.83018 12.0853 5.85696L16.3827 6.1589C17.2795 6.22191 17.6442 7.34417 16.9557 7.92228L13.6565 10.6925C13.3639 10.9382 13.2368 11.3291 13.3292 11.6999L14.37 15.8803C14.5872 16.7527 13.6325 17.4462 12.8699 16.9701L9.21582 14.6884C8.89172 14.4861 8.48064 14.4861 8.15655 14.6884L4.50242 16.9701C3.73985 17.4462 2.78521 16.7527 3.00241 15.8803L4.04321 11.6999C4.13552 11.3291 4.00849 10.9382 3.71588 10.6925L0.416702 7.92228C-0.271796 7.34417 0.0928442 6.22191 0.989655 6.1589L5.28703 5.85696C5.66818 5.83018 6.00075 5.58856 6.144 5.23434L7.75912 1.2406Z"
                      fill={nextVIPlevelColor}
                    ></path>
                  </svg>
                  <ReceivedText color={nextVIPlevelColor}>
                    {loyaltyDetails.nextVIPlevel}
                  </ReceivedText>
                </NextAward>
                <MoneyForNextStep>
                  {t('wager')} {currency}
                  {loyaltyDetails.pointsNeededForNextVIPLevel}
                </MoneyForNextStep>
                <MoneyForNextStep>to unlock the reward</MoneyForNextStep>
              </AwardWrapper>
            </Awards>
          </ProgressInfo>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              minHeight: '150px',
              alignItems: 'flex-end'
            }}
          >
            <Typography sx={{ display: 'flex', color: 'var(--soft-blue)', fontWeight: '400' }}>
              {t('wager')}&nbsp;
              <Typography component={'span'} sx={{ color: 'var(--yellow)' }}>
                $1
              </Typography>
            </Typography>
            <Typography sx={{ color: 'var(--dark-violet)', fontWeight: '400' }}>
              &nbsp;{`>`}&nbsp;
            </Typography>
            <Typography sx={{ display: 'flex', color: 'var(--soft-blue)', fontWeight: '400' }}>
              {t('get')}&nbsp;
              <Typography component={'span'} sx={{ color: 'var(--yellow)' }}>
                1XP
              </Typography>
            </Typography>
          </Box>
        )}
      </LeftBannerSide>
      {isAbove480 && (
        <RightBannerSide style={{ width: rightImageWidth }}>
          <Image
            src={rightImage || `${assets}/images/logo3D.png`}
            alt="award star"
            fill={true}
            style={{ objectFit: 'contain' }}
          />
        </RightBannerSide>
      )}
    </HomeBanner>
  );
};
export default MainBanner;

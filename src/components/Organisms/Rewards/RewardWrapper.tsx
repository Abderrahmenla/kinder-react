import React from 'react';
import {
  RewardContainer,
  CircularProgressContainer,
  CurrentRewardContainer,
  ProgressContainer,
  LevelTitle,
  WageredAmount,
  CurrentReward
} from './RewardWrapper.styles';
import CircularProgressBar from '@/components/Molecules/CircularProgressBar';
import { useTranslations } from '@/hooks/useTranslations';
import { assets } from '@/config/assets';
import { loyaltyData } from '@/hooks/types/loyaltyData';
import { useMediaQuery } from 'usehooks-ts';
import { getLevelColor } from '@/components/Atoms/GetLoyaltySettings';

interface RewardContainerProps {
  sublevelIconUrl?: string;
  loyaltyDetails: loyaltyData | undefined;
  className?: string;
}

const RewardWrapper: React.FC<RewardContainerProps> = ({
  sublevelIconUrl,
  loyaltyDetails,
  className
}) => {
  const currency = '$';
  const badgeUrl = sublevelIconUrl ? sublevelIconUrl : `${assets}/images/vip/new/Bronze-1.png`;
  const { t } = useTranslations();
  const isAbove600 = useMediaQuery('(min-width:600px)');
  const vipLevelColor = loyaltyDetails && getLevelColor(loyaltyDetails.vipLevel);
  const percentage = loyaltyDetails
    ? (
        ((loyaltyDetails.vipPointsInPeriod || 0) * 100) /
        loyaltyDetails.pointsNeededForNextVIPLevel
      ).toFixed(2)
    : null;
  const percentageToNumber = Number(percentage);
  return (
    <>
      {loyaltyDetails ? (
        <RewardContainer className={className ? className : ''}>
          <CircularProgressContainer className="circular-progressbar">
            <CircularProgressBar
              strokeWidth={3}
              sqSize={isAbove600 ? 163 : 100}
              percentage={percentageToNumber}
              color={vipLevelColor}
              badge={badgeUrl}
            />
          </CircularProgressContainer>
          <ProgressContainer className="progressbar-details">
            <CurrentRewardContainer>
              <LevelTitle>{loyaltyDetails.vipLevel}</LevelTitle>
              <LevelTitle>
                {t('wagered')}{' '}
                <strong>
                  <WageredAmount color={'var(--yellow-4)'}>
                    {currency}
                    {loyaltyDetails.pointsNeededForCurrentVIPLevel}
                  </WageredAmount>
                </strong>
              </LevelTitle>
            </CurrentRewardContainer>
            <CurrentRewardContainer>
              <CurrentReward>
                {t('wager')}{' '}
                <WageredAmount>
                  <strong>
                    {currency}
                    {loyaltyDetails.pointsNeededForNextVIPLevel} <br />
                  </strong>
                  <small>
                    {t('toUnlock')} {loyaltyDetails.nextVIPlevel}
                  </small>
                </WageredAmount>
              </CurrentReward>
            </CurrentRewardContainer>
          </ProgressContainer>
        </RewardContainer>
      ) : (
        <RewardContainer className={className ? className : ''}>
          <CircularProgressContainer>
            <CircularProgressBar strokeWidth={3} sqSize={150} percentage={0} color={'#FFD700'} />
          </CircularProgressContainer>
        </RewardContainer>
      )}
    </>
  );
};

export default RewardWrapper;

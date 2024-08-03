import { getCurrency, getLevelColor } from '@/components/Atoms/GetLoyaltySettings';
import React, { useEffect, useState } from 'react';
import {
  VipStatusCardContainer,
  VipStatusProgressContainer,
  VipStatusprogressWrapper,
  VipStatusDivider
} from './StatusTabStyle';
import { loyaltyState } from '@/components/state/loyaltyState';
import { useRecoilValue } from 'recoil';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';
import { LevelTitle, CurrentReward, WageredAmount } from '../Rewards/RewardWrapper.styles';
import CircularProgressBar from '@/components/Molecules/CircularProgressBar';
import { useLoyaltySublevelIcon } from '@/hooks/useLoyaltySublevelIcon';
import { GET_ALL_VIP_PROGRAMS } from '@/graphql/queries/vipPrograms';
import client from 'src/graphql/client';
import { calculatePercentage } from './util';
import Typography from '@/components/Atoms/Typography/Typography';

const StatusTab: React.FC = () => {
  const [level, setLevel] = useState([]);
  const getBadge = async () => {
    try {
      const { data: vipProgramsData } = await client.query({
        query: GET_ALL_VIP_PROGRAMS
      });
      const vipPrograms = vipProgramsData.vipProgram.data.attributes;
      setLevel(vipPrograms?.Level);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBadge();
  }, []);

  const { t } = useTranslations();
  const sublevelIconUrl = useLoyaltySublevelIcon(level);
  const loyaltyDetails = useRecoilValue(loyaltyState);
  if (loyaltyDetails) {
    const {
      currencyCode,
      nextVIPlevel,
      pointsNeededForCurrentVIPLevel,
      pointsNeededForNextVIPLevel,
      vipLevel
    } = loyaltyDetails;

    const currency = getCurrency(currencyCode);

    const vipLevelColor = getLevelColor(vipLevel);
    const percentage = calculatePercentage(loyaltyDetails);
    const percentageToNumber = Number(percentage);

    return (
      <VipStatusCardContainer>
        <CircularProgressBar
          strokeWidth={3}
          sqSize={163}
          percentage={percentageToNumber}
          color={vipLevelColor}
          badge={sublevelIconUrl || `${assets}/images/vip/new/Bronze-1.png`}
        />
        <VipStatusDivider />
        <VipStatusProgressContainer>
          <VipStatusprogressWrapper>
            <LevelTitle>
              <Typography type="Body" size="b1" color="var(--white)">
                {vipLevel}
              </Typography>
            </LevelTitle>
            <LevelTitle className="leftSide">
              <Typography type="Body" size="b1" color="var(--white)">
                {t('wagered')} {''}
              </Typography>
              <WageredAmount>
                <Typography type="Body" size="b1" color="var(--yellow-4)">
                  <strong>
                    {currency}
                    {pointsNeededForCurrentVIPLevel}
                  </strong>
                </Typography>
              </WageredAmount>
            </LevelTitle>
          </VipStatusprogressWrapper>
          <VipStatusprogressWrapper>
            <CurrentReward>
              <WageredAmount>
                <Typography type="Body" size="b1" color="var(--white)">
                  {t('wager')}{' '}
                  <strong>
                    {currency}
                    {pointsNeededForNextVIPLevel} <br />
                  </strong>
                </Typography>
                <Typography type="Body" size="b3" color="var(--white)">
                  {t('toUnlock')} {nextVIPlevel}
                </Typography>
              </WageredAmount>
            </CurrentReward>
          </VipStatusprogressWrapper>
        </VipStatusProgressContainer>
      </VipStatusCardContainer>
    );
  }
};
export default StatusTab;

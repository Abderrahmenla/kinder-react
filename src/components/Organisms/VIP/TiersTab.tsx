import Image from 'next/image';
import {
  VIPRewardTitle,
  VipPackageSection,
  VIPRewardTitleContainer,
  VipToggleContainer,
  TiersListWrapper,
  VipPackSub,
  VipRewardDetails,
  VipPackages,
  RewardLabel,
  RewardBonus
} from './TiersTabStyle';
import React, { useEffect, useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { assets } from '@/config/assets';
import { GET_ALL_VIP_PROGRAMS } from '@/graphql/queries/vipPrograms';
import client from 'src/graphql/client';
import { Level as LevelTypes } from '@/graphql/types/vipProgramsTypes';
import Typography from '@/components/Atoms/Typography/Typography';

const TiersTab = ({
  activeAwards,
  setAward
}: {
  activeAwards: string[];
  setAward: (award: string) => () => void;
}) => {
  const { t } = useTranslations();

  const [levels, setLevels] = useState<LevelTypes[]>([]);

  const getLevels = async () => {
    try {
      const { data: vipProgramsData } = await client.query({
        query: GET_ALL_VIP_PROGRAMS
      });
      const vipPrograms = vipProgramsData.vipProgram.data.attributes;
      if (vipPrograms) {
        setLevels(vipPrograms.Level);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLevels();
  }, []);

  const topTierItems = levels
    .filter((level) =>
      ['Double Diamond', 'Pink Diamond', 'Blue Diamond', 'Onyx', 'Black Diamond'].includes(
        level.Level
      )
    )
    .map((level) => ({
      level: level.Level,
      WagerAmount: level.SubLevels[0].WagerAmount,
      iconUrl: level.SubLevels[0].Icon.data.attributes.url
    }));

  const filteredLevels = levels.filter(
    (level) =>
      !['Double Diamond', 'Pink Diamond', 'Blue Diamond', 'Onyx', 'Black Diamond'].includes(
        level.Level
      )
  );

  return (
    <VipPackages data-testid="vip-packages">
      <VipPackageSection
        key={`vip-pack-top`}
        className={activeAwards.includes('Top Tiers') ? ' open' : ''}
      >
        <VipToggleContainer onClick={setAward('Top Tiers')}>
          <VIPRewardTitleContainer>
            <Image
              width={30}
              height={30}
              src={`${assets}/images/vip/new/gold_2.svg`}
              alt="Top Tiers"
            />
            <VIPRewardTitle>
              <Typography size="b2" type="Body" color="var(--white)">
                {'Top Tiers'}
              </Typography>
            </VIPRewardTitle>
          </VIPRewardTitleContainer>
          <Image
            width={3.9}
            height={6.5}
            src={
              activeAwards.includes('Top Tiers')
                ? `${assets}/images/dropdown/upCaret.svg`
                : `${assets}/images/dropdown/downCaret.svg`
            }
            alt="caret"
          />
        </VipToggleContainer>
        <TiersListWrapper className="toggleList">
          {topTierItems.map((reward, index) => (
            <VipPackSub key={`top-tier-${index}`}>
              <Image src={reward.iconUrl || ''} alt={reward.level} width={48} height={48} />
              <VipRewardDetails>
                <RewardLabel>
                  <Typography size="h5" type="Heading" color="var(--white)">
                    {t(reward.level)}
                  </Typography>
                </RewardLabel>
                <RewardBonus>
                  <Typography size="p1" type="Paragraph" color="var(--soft-blue-100)">
                    {reward.WagerAmount === 'NA' ? (
                      <>{t('highestWagering')}</>
                    ) : (
                      <>
                        ${reward.WagerAmount} {t('toUnlock')}
                      </>
                    )}
                  </Typography>
                </RewardBonus>
              </VipRewardDetails>
            </VipPackSub>
          ))}
        </TiersListWrapper>
      </VipPackageSection>
      {filteredLevels.map((level) => (
        <VipPackageSection
          key={`vip-pack-${level.Level}`}
          data-testid={`vip-pack-${level.Level}`}
          className={activeAwards.includes(level.Level) ? ' open' : ''}
        >
          <VipToggleContainer onClick={setAward(level.Level)}>
            <VIPRewardTitleContainer>
              <Image
                width={30}
                height={30}
                src={`${level?.SubLevels[0]?.Icon?.data?.attributes.url}`}
                alt={level.Level}
              />
              <VIPRewardTitle>
                <Typography size="b2" type="Body" color="var(--white)">
                  {t(`${level.Level}`)}
                </Typography>
              </VIPRewardTitle>
            </VIPRewardTitleContainer>
            <Image
              width={3.9}
              height={6.5}
              src={
                activeAwards.includes(level.Level)
                  ? `${assets}/images/dropdown/upCaret.svg`
                  : `${assets}/images/dropdown/downCaret.svg`
              }
              alt="caret"
            />
          </VipToggleContainer>
          <TiersListWrapper className="toggleList">
            {level.SubLevels.map((reward) => (
              <VipPackSub key={`${level.Level}-level-${reward.Level}`}>
                <Image
                  src={`${reward?.Icon?.data?.attributes.url}`}
                  alt=""
                  width={48}
                  height={48}
                />
                <VipRewardDetails>
                  <RewardLabel>
                    <Typography size="h5" type="Heading" color="var(--white)">
                      {t(`${reward.Level}`)}
                    </Typography>
                  </RewardLabel>
                  <RewardBonus>
                    <Typography size="p1" type="Paragraph" color="var(--soft-blue-100)">
                      ${reward.WagerAmount} {t('toUnlock')}
                    </Typography>
                  </RewardBonus>
                </VipRewardDetails>
              </VipPackSub>
            ))}
          </TiersListWrapper>
        </VipPackageSection>
      ))}
    </VipPackages>
  );
};

export default TiersTab;

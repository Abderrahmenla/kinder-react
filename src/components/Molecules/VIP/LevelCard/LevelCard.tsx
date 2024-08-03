import React from 'react';
import {
  LevelCardContainer,
  LevelGroupContainer,
  LevelGroupDiamondContainer,
  LevelCardDiamondItem,
  LevelCardDiamond,
  LevelGroupTitle,
  LevelCard,
  LevelIcon,
  LevelIconDiamond,
  LevelTitle,
  LevelDiamondTitle,
  WagerRequirement,
  WagerDiamondRequirement,
  CashRewardContainer,
  CashRewardText,
  CashRewardPrice,
  LevelCardBanner,
  LevelCardBannerLeft,
  LevelBannerTitle,
  LevelBannerReward,
  LevelBannerLabel
} from './LevelCard.style';
import { Level as LevelTypes, SubLevel } from '@/graphql/types/vipProgramsTypes';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from '@/hooks/useTranslations';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Typography from '@/components/Atoms/Typography/Typography';
import ReactHtmlParser from 'react-html-parser';
import { Status } from '@/components/Molecules/VIP/Status/Status';

interface Level {
  data: LevelTypes[];
  selectedTitle: string;
}

interface LevelCardItemProps {
  subLevel: SubLevel;
}

const LevelCardItem: React.FC<LevelCardItemProps> = ({ subLevel }) => {
  const { t } = useTranslations();

  return (
    <LevelCard level={subLevel.Level}>
      <LevelIcon
        src={subLevel.Icon.data?.attributes.url}
        alt={subLevel.Level}
        width={79}
        height={93}
        loading="lazy"
      />
      <WagerRequirement>
        <LevelTitle>{subLevel.Level}</LevelTitle>
        {/* Add condition if Black Diamond WagerAmount is "NA" */}
        {subLevel.WagerAmount === 'NA' ? (
          <>
            {t('highestWagering')} <br /> {t('playersOfThePreviousMonth')}
          </>
        ) : (
          <>
            {t('wager')} <strong>${subLevel.WagerAmount}</strong> {t('toUnlockTheReward')}
          </>
        )}
        <CashRewardContainer>
          {/* Add condition if Black Diamond WagerAmount is "NA" */}
          {subLevel.WagerAmount !== 'NA' && <CashRewardText>{t('cashReward')}</CashRewardText>}
          {/* Add condition if Black Diamond WagerAmount is "NA" */}
          <CashRewardPrice>
            {subLevel.CashReward === '0'
              ? '--'
              : subLevel.WagerAmount === 'NA'
              ? `${subLevel.CashReward}`
              : `$${subLevel.CashReward}`}
          </CashRewardPrice>
        </CashRewardContainer>
      </WagerRequirement>
    </LevelCard>
  );
};

const swiperProps = {
  spaceBetween: 15,
  slidesPerView: 1.5,
  draggable: true,
  modules: [Navigation],
  navigation: true,
  breakpoints: {
    640: {
      slidesPerView: 2.5
    },
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4
    }
  }
};

export const VIPLevelCards: React.FC<Level> = ({ data, selectedTitle }) => {
  const isMobile = UseMediaQuery(768);
  const { t } = useTranslations();

  return (
    <div>
      {data.map((levelGroup) => (
        <LevelCardContainer key={levelGroup.Level}>
          <LevelGroupTitle
            hasTitle={selectedTitle === 'All'}
            isDiamondOrOnyx={
              levelGroup.Level.includes('Onyx') ||
              (levelGroup.Level.includes('Diamond') && levelGroup.Level !== 'Diamond')
            }
          >
            {selectedTitle === 'All' ? levelGroup.Level : ''}
          </LevelGroupTitle>
          {levelGroup.Level.includes('Onyx') ||
          (levelGroup.Level.includes('Diamond') && levelGroup.Level !== 'Diamond') ? (
            levelGroup.SubLevels.map((subLevel) =>
              isMobile ? (
                <LevelCardItem key={subLevel.Level} subLevel={subLevel} />
              ) : (
                <React.Fragment key={subLevel.Level}>
                  <LevelGroupDiamondContainer bg={subLevel.BackgroundImage?.data?.attributes.url}>
                    <LevelCardDiamond>
                      <LevelIconDiamond
                        width={134.4}
                        height={153.6}
                        src={subLevel.Icon.data?.attributes.url}
                        alt={`${subLevel.Level}`}
                      />
                      <div>
                        <LevelCardDiamondItem>
                          <LevelDiamondTitle>{subLevel.Level}</LevelDiamondTitle>
                          <WagerDiamondRequirement>
                            <div>
                              {/* Add condition if Black Diamond WagerAmount is "NA" */}
                              {subLevel.WagerAmount === 'NA' ? (
                                <>
                                  {t('highestWagering')} <br /> {t('playersOfThePreviousMonth')}
                                </>
                              ) : (
                                <>
                                  {t('wager')} <strong>${subLevel.WagerAmount}</strong>
                                </>
                              )}
                              {''} <br />
                              {/* Add condition if Black Diamond WagerAmount is "NA" */}
                              {subLevel.WagerAmount !== 'NA' && t('toUnlockTheReward')}
                            </div>
                            {/* Add condition if Black Diamond WagerAmount is "NA" */}
                            {subLevel.WagerAmount !== 'NA' && <span>{t('cashReward')}</span>}
                          </WagerDiamondRequirement>
                          {/* Add condition if Black Diamond WagerAmount is "NA" */}
                          <CashRewardPrice>
                            {subLevel.CashReward === '0'
                              ? '--'
                              : subLevel.WagerAmount === 'NA'
                              ? `${subLevel.CashReward}`
                              : `$${subLevel.CashReward}`}
                          </CashRewardPrice>
                        </LevelCardDiamondItem>
                      </div>
                    </LevelCardDiamond>
                  </LevelGroupDiamondContainer>
                </React.Fragment>
              )
            )
          ) : (
            <LevelCardContainer>
              <LevelGroupContainer>
                <Swiper
                  {...swiperProps}
                  breakpointsBase="window"
                  navigation={!isMobile && levelGroup.SubLevels.length > 4}
                >
                  {levelGroup.SubLevels.map((subLevel, index: number) => (
                    <SwiperSlide key={index}>
                      <LevelCardItem subLevel={subLevel} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </LevelGroupContainer>
            </LevelCardContainer>
          )}
          <Status selectedTitle={levelGroup.Level} />
          {selectedTitle !== 'All' && levelGroup?.MilestoneBanner && (
            <LevelCardBanner
              backgroundImage={levelGroup.MilestoneBanner?.BannerImage?.data?.attributes?.url}
            >
              <LevelCardBannerLeft>
                <Image
                  src={levelGroup.MilestoneBanner?.Badge?.data?.attributes?.url}
                  width={25}
                  height={27}
                  alt="icon"
                />
                <LevelBannerTitle>
                  <Typography type="Heading" size="h4" color="var(--white)">
                    {levelGroup.MilestoneBanner?.Level}
                  </Typography>
                  <Typography type="Heading" size="h3" color="var(--white)">
                    {levelGroup.MilestoneBanner?.Prize}
                  </Typography>
                </LevelBannerTitle>
                <Typography type="Paragraph" size="p1" color="var(--soft-blue-100)">
                  {ReactHtmlParser(levelGroup.MilestoneBanner.Milestone) as React.ReactNode}
                </Typography>
                <LevelBannerReward>
                  <Typography type="Heading" size="h4" color="var(--soft-blue-100)">
                    {levelGroup.MilestoneBanner?.Reward}
                  </Typography>
                  <Typography type="Heading" size="h4" color="var(--white)">
                    {levelGroup.MilestoneBanner?.RewardAmount}
                  </Typography>
                </LevelBannerReward>
              </LevelCardBannerLeft>
              <LevelBannerLabel>
                <Image
                  src={levelGroup.MilestoneBanner?.PrizeLabelIcon?.data?.attributes?.url}
                  width={24}
                  height={24}
                  alt="milestone"
                />
                <Typography type="Heading" size="h5" color="var(--white)">
                  {levelGroup?.MilestoneBanner?.PrizeLabel}
                </Typography>
              </LevelBannerLabel>
            </LevelCardBanner>
          )}
        </LevelCardContainer>
      ))}
    </div>
  );
};

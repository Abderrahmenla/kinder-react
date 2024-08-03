import React, { useState } from 'react';
import { Grid } from '@mui/material';
import VIPBanner from './VIPBanner';
import { Steps as Step } from '@/components/Molecules/VIP/Steps/Steps';
import { VIPProgramAttributes, Level } from '@/graphql/types/vipProgramsTypes';
import { VipLevelTitles } from '@/components/Molecules/VIP/Level/Level';
import { VIPLevelCards } from '@/components/Molecules/VIP/LevelCard/LevelCard';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';
import { loyaltyState } from '@/components/state/loyaltyState';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { LevelCardContainer } from '@/components/Molecules/VIP/LevelCard/LevelCard.style';
import { useLoyaltySublevelIcon } from '@/hooks/useLoyaltySublevelIcon';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VIPContainer = ({
  username,
  isAuthenticated,
  vipProgram
}: {
  username: string | null;
  isAuthenticated?: boolean;
  vipProgram: VIPProgramAttributes;
}) => {
  const { t } = useTranslations();
  const { Steps, Level } = vipProgram;
  const [selectedTitle, setSelectedTitle] = useState<string>('All');
  const [previousIndex, setPreviousIndex] = useState<number>(0);
  const titlesOrder = ['All', ...vipProgram.Level.map((level) => level.Level)];

  const handleTitleClick = (title: string) => {
    const currentIndex = titlesOrder.indexOf(selectedTitle);
    setPreviousIndex(currentIndex);
    setSelectedTitle(title);
  };

  const newIndex = titlesOrder.indexOf(selectedTitle);
  const animationDirection = newIndex > previousIndex ? 50 : newIndex < previousIndex ? -50 : 0;
  const filteredData: Level[] =
    selectedTitle === 'All' ? Level : Level.filter((level) => level.Level === selectedTitle);

  const loyaltyDetails = useRecoilValue(loyaltyState);

  // Get sublevel icon
  const sublevelIconUrl = useLoyaltySublevelIcon(Level);

  return (
    <Grid item xs={12}>
      <VIPBanner
        rightImage={`${assets}/images/coins.png`}
        rightImageWidth={200}
        headline={isAuthenticated ? `${t('hello')}, ${username}!` : `${t('vipExperience')}`}
        subtitle={`${t('wereGlad')}!`}
        isAuthenticated={isAuthenticated}
        loyaltyDetails={loyaltyDetails}
        sublevelIconUrl={sublevelIconUrl}
      />

      <Step data={Steps} data-testid="Step" />
      <VipLevelTitles
        VIPLevelTitles={titlesOrder}
        onTitleClick={handleTitleClick}
        data-testid="VipLevelTitles"
      />
      <LevelCardContainer>
        <motion.div
          key={selectedTitle + 1}
          initial={{ opacity: 1, y: animationDirection }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: animationDirection }}
          id="VIPLevelCards"
        >
          <VIPLevelCards
            data={filteredData}
            data-testid="VIPLevelCards"
            selectedTitle={selectedTitle}
          />
        </motion.div>
      </LevelCardContainer>
    </Grid>
  );
};

export default VIPContainer;

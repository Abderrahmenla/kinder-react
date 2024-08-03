import React from 'react';
import {
  GiveawayContainer,
  Title
} from '@/components/Molecules/ChristmasGiveaway/ChristmasGiveaway.styles';
import { assets } from '@/config/assets';
const ChristmasBanner: React.FC = () => {
  return (
    <GiveawayContainer
      style={{ backgroundImage: `url(${assets}/images/christmas-giveaway/christmas-banner.svg)` }}
    >
      <Title>
        CHRISTMAS <span>GIVEAWAY</span>
      </Title>
    </GiveawayContainer>
  );
};

export default ChristmasBanner;

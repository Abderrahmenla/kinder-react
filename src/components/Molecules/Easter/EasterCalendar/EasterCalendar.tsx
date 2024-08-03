import React, { useState } from 'react';
import Switcher from '@/components/Atoms/Switcher/Switcher';
import { useTranslations } from '@/hooks/useTranslations';
import EasterGrid from '@/components/Molecules/Easter/EasterGrid/EasterGrid';
import EasterRules from '@/components/Molecules/Easter/EasterRules/EasterRules';
import {
  EasterCalendarContainer,
  SwitcherContainer
} from '@/components/Molecules/Easter/Easter.styles';
import { mockedEggs } from '@/utils/easterUtils';
import { useRecoilValue } from 'recoil';
import { easterIsFirstTimeDeposit } from '@/components/state/easterIsFirstTimeDeposit';
import EasterPrizes from '@/components/Molecules/Easter/EasterPrizes/EasterPrizes';
import { EasterCampaignProps } from '@/components/Molecules/Easter/Easter.types';

const EasterCalendar: React.FC<EasterCampaignProps> = ({
  easterPrizeData,
  easterCampaignData,
  formattedDate
}) => {
  const [toggleSwitcher, setToggleSwitcher] = useState<boolean>(false);
  const { t } = useTranslations();

  const handleToggle = (index: number) => {
    setToggleSwitcher(index !== 0);
  };

  const firstTimeDeposit = useRecoilValue(easterIsFirstTimeDeposit);
  const { Rules, VIPLevelPrizes } = easterPrizeData;
  return (
    <EasterCalendarContainer>
      <SwitcherContainer>
        <Switcher
          handleToggle={handleToggle}
          options={[{ title: t('play') }, { title: t('rules') }]}
          tabSwitcherStyles={{ height: '44px', overflow: 'hidden', maxWidth: '240px' }}
        />
      </SwitcherContainer>
      {!toggleSwitcher ? (
        <EasterGrid
          depositQualified={firstTimeDeposit}
          mockedEggs={mockedEggs}
          easterCampaignData={easterCampaignData}
          formattedDate={formattedDate}
        />
      ) : (
        <EasterRules easterRules={Rules} />
      )}
      <EasterPrizes prizes={VIPLevelPrizes} depositQualified={firstTimeDeposit} />
    </EasterCalendarContainer>
  );
};

export default EasterCalendar;

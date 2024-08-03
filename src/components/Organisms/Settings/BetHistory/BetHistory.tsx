import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { TabObj } from '@/components/Atoms/Tabs/Tabs.type';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from '@/hooks/useTranslations';
import { Container, CustomTabs, Title } from './BetHistory.styles';
import { TAB, TAB_OPTIONS } from './BetHistory.constants';

const CasinoBetsWithHOC = dynamic(() =>
  import('./withBetHistoryHOC').then((mod) => mod.CasinoBetsWithHOC)
);
const SportsBetsWithHOC = dynamic(() =>
  import('./withBetHistoryHOC').then((mod) => mod.SportsBetsWithHOC)
);

const BetHistory = () => {
  const { t } = useTranslations();
  const isMobile = UseMediaQuery(768);
  const [selectedTab, setSelectedTab] = useState(TAB.casino);

  const translatedTabs: TabObj[] = useMemo(() => {
    return TAB_OPTIONS.map((tab) => ({ ...tab, label: t(tab.label) }));
  }, [t]);

  const handleOnClickTab = useCallback(
    (tabName: string) => setSelectedTab(tabName),
    [setSelectedTab]
  );

  return (
    <Container isMobile={isMobile}>
      {!isMobile && (
        <Title size="h5" type="Heading">
          {t('betHistory')}
        </Title>
      )}

      <CustomTabs
        isMobile={isMobile}
        tabOptions={translatedTabs}
        tabOnclickHandler={handleOnClickTab}
      />

      {selectedTab === 'casino' ? (
        <CasinoBetsWithHOC isMobile={isMobile} getTranslation={t} />
      ) : (
        <SportsBetsWithHOC isMobile={isMobile} getTranslation={t} />
      )}
    </Container>
  );
};

export default BetHistory;

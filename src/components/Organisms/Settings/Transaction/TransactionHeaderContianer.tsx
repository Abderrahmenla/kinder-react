import React, { useMemo } from 'react';
import { HeaderContainer, TableTitle, TransactionTabs } from './Transaction.style';
import { tabOptions } from './Transaction.constants';
import { TransactionHeaderContainer } from './Transaction.type';
import { TabObj } from '@/components/Atoms/Tabs/Tabs.type';

const TransactionHeaderContianer: React.FC<TransactionHeaderContainer> = ({
  toggleTabState,
  t,
  isMobile
}) => {
  const translatedTabs: TabObj[] = useMemo(() => {
    return tabOptions.map((tab) => ({ ...tab, label: t(tab.label) }));
  }, [t]);

  return (
    <HeaderContainer>
      {!isMobile && <TableTitle size="h5">{t('transactions')}</TableTitle>}
      <TransactionTabs tabOptions={translatedTabs} tabOnclickHandler={toggleTabState} />
    </HeaderContainer>
  );
};

export default TransactionHeaderContianer;

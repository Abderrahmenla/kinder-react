import React from 'react';
import { StatusWrapper, StatusItem, StatusLabel, StatusValue } from './Status.style';
import { useTranslations } from '@/hooks/useTranslations';

export const Status: React.FC<{ selectedTitle: string }> = ({ selectedTitle }) => {
  const { t } = useTranslations();
  const statuses = [
    { label: t('weekly'), value: t('cashbackIncreased') },
    { label: t('weeklyFreeSpins'), value: t('weeklyFreeSpinsAmount') },
    { label: t('rakeback'), value: t('increased') }
  ];

  return (
    <StatusWrapper>
      {statuses.map((status, index) => {
        // Check if selectedTitle is Bronze and if the status label is weekly and cashbackIncreased
        if (
          selectedTitle === 'Bronze' &&
          status.label === t('weekly') &&
          status.value === t('cashbackIncreased')
        ) {
          return null; // Hide cashbackIncreased status item
        } else {
          return (
            <StatusItem key={index}>
              <StatusLabel>{status.label}</StatusLabel>
              <StatusValue>{status.value}</StatusValue>
            </StatusItem>
          );
        }
      })}
    </StatusWrapper>
  );
};

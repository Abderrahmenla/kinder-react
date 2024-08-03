import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  EasterBannerContainer,
  Title,
  CountdownWrapper
} from '@/components/Molecules/Easter/Easter.styles';
import { useTranslations } from '@/hooks/useTranslations';
import { EasterBannerProps } from '../Easter.types';
import { closestDate, futureTargetDates } from '@/utils/easterUtils';
import Typography from '@/components/Atoms/Typography/Typography';
dayjs.extend(utc);

const formatTime = (time: number) => {
  return time < 10 ? `0${time}` : `${time}`;
};

const EasterBanner: React.FC<EasterBannerProps> = ({ easterCampaignData, depositQualified }) => {
  const targetDate = closestDate(easterCampaignData);
  const { t } = useTranslations();
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  const sortedEasterCampaignData = [...easterCampaignData].sort((a, b) => {
    if (a.id === '1') return -1;
    if (b.id === '1') return 1;
    return Number(a.id) - Number(b.id);
  });

  const sortedFutureDates = futureTargetDates(sortedEasterCampaignData);

  const initialTargetDate = dayjs.utc(closestDate(sortedFutureDates));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = dayjs.utc();
      const diffSeconds = initialTargetDate.diff(now, 'second');
      const diffHours = Math.floor(diffSeconds / 3600);
      const diffMinutes = Math.floor((diffSeconds % 3600) / 60);
      const diffSecondsRemainder = diffSeconds % 60;

      setSeconds(diffSecondsRemainder);
      setMinutes(diffMinutes);
      setHours(diffHours);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialTargetDate]);

  if (depositQualified === undefined) {
    return null;
  }

  const formattedCountdownTime = () => {
    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  };

  return (
    <>
      {initialTargetDate && (
        <EasterBannerContainer>
          {!depositQualified && (
            <CountdownWrapper>
              <Typography size="b1" type="Body" color="var(--white)">
                {t('nextWave')}
              </Typography>
              {targetDate && (
                <Typography size="h4" type="Heading" color="var(--white)">
                  {formattedCountdownTime()}
                </Typography>
              )}
            </CountdownWrapper>
          )}
          <Title size={'h2'} type={'Heading'}>
            {t('crackIntoEaster')}
            <Typography size="h3" type="Heading" color="var(--white)">
              {t('excitement')}
            </Typography>
          </Title>
        </EasterBannerContainer>
      )}
    </>
  );
};

export default EasterBanner;

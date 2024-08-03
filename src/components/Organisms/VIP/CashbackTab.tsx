import {
  CashbackCountdown,
  CashbackInfoRow,
  CbkCountdownWrap,
  CbkDate,
  CbkText,
  CounterCol,
  Days,
  Label
} from './CashbackTabStyles';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import { useTranslations } from '@/hooks/useTranslations';
import Typography from '@/components/Atoms/Typography/Typography';

dayjs.extend(utc);
dayjs.extend(weekday);

const getReturnValues = (countDown: number) => {
  const days = Math.abs(Math.floor(countDown / (1000 * 60 * 60 * 24)));
  const hours = Math.abs(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.abs(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.abs(Math.floor((countDown % (1000 * 60)) / 1000));

  return [days, hours, minutes, seconds];
};

const getNextMondayUTC = () => {
  dayjs.extend(utc);
  dayjs.extend(weekday);

  const now = dayjs().utc();
  const nextMonday = now.day() >= 1 ? now.add(1, 'week').day(1) : now.day(1);

  return new Date(Date.UTC(nextMonday.year(), nextMonday.month(), nextMonday.date(), 0, 0, 0));
};

const useCountdown = (targetDate: Date) => {
  const [countDownDate, setCountDownDate] = useState(targetDate.getTime());
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        const nextMonday = getNextMondayUTC();
        setCountDownDate(nextMonday.getTime());
        setCountDown(nextMonday.getTime() - now);
      } else {
        setCountDown(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const CashbackTab = () => {
  const targetDate = getNextMondayUTC();
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const { t } = useTranslations();

  return (
    <CashbackInfoRow data-testid="cashback-container">
      <CbkCountdownWrap>
        <Typography size="h5" type="Heading" color="var(--white)">
          {t('nextCashBack')}
        </Typography>
      </CbkCountdownWrap>
      <CbkDate>
        <Typography className="csh-date" size="p2" type="Paragraph" color="var(--soft-blue-100)">
          {dayjs(targetDate).format('DD.MM.YYYY')}
        </Typography>
      </CbkDate>
      <CashbackCountdown>
        <CounterCol data-testid="cashback-clock-days">
          <Days>
            <Typography size="h3" type="Heading" color="var(--white)">
              {days}
            </Typography>
          </Days>
          <Label>
            <Typography size="b3" type="Body" color="var(--soft-blue-100)">
              {t('days')}
            </Typography>
          </Label>
        </CounterCol>
        <CounterCol data-testid="cashback-clock-hours">
          <Days>
            <Typography size="h3" type="Heading" color="var(--white)">
              {hours}
            </Typography>
          </Days>
          <Label>
            <Typography size="b3" type="Body" color="var(--soft-blue-100)">
              {t('hours')}
            </Typography>
          </Label>
        </CounterCol>
        <CounterCol data-testid="cashback-clock-minutes">
          <Days>
            <Typography size="h3" type="Heading" color="var(--white)">
              {minutes}
            </Typography>
          </Days>
          <Label>
            <Typography size="b3" type="Body" color="var(--soft-blue-100)">
              {t('minutes')}
            </Typography>
          </Label>
        </CounterCol>
        <CounterCol data-testid="cashback-clock-seconds">
          <Days>
            <Typography size="h3" type="Heading" color="var(--white)">
              {seconds}
            </Typography>
          </Days>
          <Label>
            <Typography size="b3" type="Body" color="var(--soft-blue-100)">
              {t('seconds')}
            </Typography>
          </Label>
        </CounterCol>
      </CashbackCountdown>
      <CbkText>
        <Typography size="p2" type="Paragraph" color="var(--soft-blue)">
          {t('cashBackCaption')}
        </Typography>
      </CbkText>
    </CashbackInfoRow>
  );
};

export default CashbackTab;

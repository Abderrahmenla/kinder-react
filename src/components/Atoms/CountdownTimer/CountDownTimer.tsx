import React, { useState, useEffect } from 'react';
import {
  CountDownTimerContainer,
  CountDownTimerHeading,
  CountDownTimerUnitsContainer,
  CountdownTimerSeparator,
  CountdownTimerText,
  CountdownTimerTitle
} from './CountDownTimerStyles';
import { CountdownTimerUnit } from './CountdownTimerUnit';
import { calculateTimeLeftCountdown } from '@/utils/calculateTimeLeftCountdown';

type CountDownTimeTypes = {
  title?: string;
  endDate: string;
};

const CountDownTimer = ({ title, endDate }: CountDownTimeTypes) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeftCountdown(endDate));

  const getUnitLabel = (value: string, singularLabel: string) => {
    return value === '1' ? singularLabel : `${singularLabel}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeftCountdown(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <CountDownTimerContainer>
      <CountDownTimerHeading>
        <CountdownTimerText size="p1" type="Heading">
          Countdown
        </CountdownTimerText>
        <CountdownTimerTitle size="p1" type="Heading">
          {title}
        </CountdownTimerTitle>
      </CountDownTimerHeading>
      <CountDownTimerUnitsContainer>
        <CountdownTimerUnit value={timeLeft.days} label={getUnitLabel(timeLeft.days, 'Day')} />
        <CountdownTimerSeparator>:</CountdownTimerSeparator>
        <CountdownTimerUnit value={timeLeft.hours} label={getUnitLabel(timeLeft.hours, 'Hour')} />
        <CountdownTimerSeparator>:</CountdownTimerSeparator>
        <CountdownTimerUnit
          value={timeLeft.minutes}
          label={getUnitLabel(timeLeft.minutes, 'Minute')}
        />
        <CountdownTimerSeparator>:</CountdownTimerSeparator>
        <CountdownTimerUnit
          value={timeLeft.seconds}
          label={getUnitLabel(timeLeft.seconds, 'Second')}
        />
      </CountDownTimerUnitsContainer>
    </CountDownTimerContainer>
  );
};

export default CountDownTimer;

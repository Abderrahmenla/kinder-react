import {
  CountdownTimerText,
  CountdownTimerUnitContainer,
  CountdownTimerBoldText
} from './CountDownTimerStyles';

type CountDownTimerUnitType = {
  value: string;
  label: string;
};
export const CountdownTimerUnit = ({ value, label }: CountDownTimerUnitType) => {
  return (
    <CountdownTimerUnitContainer>
      <CountdownTimerBoldText size="p1" type="Heading">
        {value}
      </CountdownTimerBoldText>
      <CountdownTimerText size="p2" type="Heading">
        {label}
      </CountdownTimerText>
    </CountdownTimerUnitContainer>
  );
};

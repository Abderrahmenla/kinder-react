import styled from '@emotion/styled';
import Typography from '../Typography/Typography';

export const CountDownTimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px 10px 20px;
`;

export const CountDownTimerUnitsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0px 10px;
`;

export const CountDownTimerHeading = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px 20px;
`;

export const CountdownTimerBoldText = styled(Typography)`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  color: var(--white);
`;
export const CountdownTimerText = styled(Typography)`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: var(--white);
`;

export const CountdownTimerTitle = styled(Typography)`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  margin-left: 10px;
  color: var(--light-blue);
`;

export const CountdownTimerSeparator = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: var(--white);
  padding: 0 5px;
  margin-top: 5px;
  align-self: flex-start;
`;
export const CountdownTimerUnitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

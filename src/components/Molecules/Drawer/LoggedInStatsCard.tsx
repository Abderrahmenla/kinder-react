import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Level, Stars } from '@/components/Organisms/Drawer/menuData/data';

const CardContainer = styled.div`
  height: 155px;
  width: 231px;
  background: #301957;
  border-radius: 15px;
  padding: 14px 18px;
  color: white;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  margin-bottom: 34px;
  align-items: center;
`;

const BadgeText = styled.span`
  color: white;
  margin-left: 8px;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  position: relative;
`;

export interface ProgressBarProps {
  percentage: number;
}

export const ProgressBarText = styled.span<ProgressBarProps>`
  position: absolute;
  left: ${(props) => (props.percentage > 93 && props.percentage <= 100 ? 90 : props.percentage)}%;
  top: -20px;
  transform: translateX(-50%);
`;

export const ProgressBarBackground = styled.div`
  height: 20px;
  width: 195px;
  background: rgb(79, 57, 125);
  border-radius: 16px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  background: linear-gradient(90deg, #9746ff 0%, #0092ff 100%);
  width: ${(props) => props.percentage}%;
  border-radius: 16px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const BottomItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const BottomText = styled.span`
  color: ${(props) => props.color || 'white'};
`;

const StyledImage = styled(Image)``;

interface LoggedInStatsCardProps {
  userInfo?: {
    firstName?: string;
    level?: {
      icon: string;
      name: Level;
    };
    percentage?: number;
    stars?: {
      icon: string;
      name: Stars;
    };
  };
  starterBadge?: string;
}

const LoggedInStatsCard: React.FC<LoggedInStatsCardProps> = ({ userInfo, starterBadge }) => {
  const percentage = userInfo?.percentage ?? 0;

  return (
    <CardContainer data-testid="LoggedInStatsCard">
      <BadgeContainer>
        <StyledImage src={starterBadge || ''} width={38} height={48} alt="Level Icon" />
        <BadgeText>{userInfo?.firstName}</BadgeText>
      </BadgeContainer>

      <ProgressBarContainer>
        <ProgressBarText percentage={percentage}>{percentage}%</ProgressBarText>
        <ProgressBarBackground>
          <ProgressBar percentage={percentage} />
        </ProgressBarBackground>
      </ProgressBarContainer>

      <BottomContainer>
        <BottomItem>
          <StyledImage src={userInfo?.level?.icon || ''} width={18} height={18} alt="Level Icon" />
          <BottomText>{userInfo?.level?.name}</BottomText>
        </BottomItem>
        <BottomItem>
          <StyledImage src={userInfo?.stars?.icon || ''} width={18} height={18} alt="Star Icon" />
          <BottomText color="#CA9265">{userInfo?.stars?.name}</BottomText>
        </BottomItem>
      </BottomContainer>
    </CardContainer>
  );
};

export default LoggedInStatsCard;

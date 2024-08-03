import React from 'react';
import {
  GameSwitcherContainer,
  ToggleSwitchLabels,
  Label
} from '@/components/Molecules/Casino/GameSwitcher/GameSwitcher.style';
import { useTranslations } from '@/hooks/useTranslations';
import ToggleSwitch from '@/components/Atoms/ToggleSwitch/ToggleSwitch';

interface GameSwitcherProps {
  handleGameSwitch: () => void;
  isRealGame: boolean;
  defaultChecked: boolean;
  isFullScreen?: boolean;
}

export const GameSwitcher: React.FC<GameSwitcherProps> = ({
  handleGameSwitch,
  isRealGame,
  defaultChecked,
  isFullScreen
}) => {
  const { t } = useTranslations();

  return (
    <GameSwitcherContainer isActive={isRealGame} isFullScreen={isFullScreen}>
      <ToggleSwitch defaultChecked={defaultChecked} onChange={handleGameSwitch} />
      <ToggleSwitchLabels isActive={isRealGame}>
        <Label size="p1" type="Paragraph">
          {t('demoPlay')}
        </Label>
        <Label size="p1" type="Paragraph">
          {t('realPlay')}
        </Label>
      </ToggleSwitchLabels>
    </GameSwitcherContainer>
  );
};

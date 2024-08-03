import React from 'react';
import {
  ToggleSwitchContainer,
  ToggleSwitchBackground,
  BackgroundRect,
  ToggleCircle
} from './ToggleCheckbox.styles';
interface ToggleCheckboxProps {
  isActive: boolean | undefined;
  onClick: () => void;
}

const ToggleCheckbox: React.FC<ToggleCheckboxProps> = ({ isActive, onClick }) => {
  return (
    <ToggleSwitchContainer onClick={onClick}>
      <ToggleSwitchBackground xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 24" fill="none">
        <BackgroundRect width="41" height="24" rx="12" isActive={isActive} />
        <ToggleCircle cx="12" cy="12" r="9" isActive={isActive} />
      </ToggleSwitchBackground>
    </ToggleSwitchContainer>
  );
};

export default ToggleCheckbox;

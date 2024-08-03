import React, { useState, useEffect } from 'react';
import { SwitchBackground, SwitchContainer, SwitchInput, SwitchSlider } from './ToggleSwitch.style';
import { ToggleSwitchProps } from './ToggleSwitch.type';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onChange, defaultChecked }) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <SwitchContainer>
      <SwitchInput type="checkbox" checked={isChecked} onChange={handleToggle} />
      <SwitchBackground isChecked={isChecked} />
      <SwitchSlider isChecked={isChecked} />
    </SwitchContainer>
  );
};

export default ToggleSwitch;

import React, { useState, useEffect, CSSProperties } from 'react';
import Link from 'next/link';
import {
  ButtonTypography,
  TabButton,
  TabSwitcher
} from '@/components/Atoms/Switcher/Switcher.styles';
import BaseSwitcherIcon from '@/components/Atoms/BaseSwitcherIcon/BaseSwitcherIcon';

export interface TabSwitcherProps {
  options: { title?: string; url?: string }[];
  icons?: React.ReactNode[];
  handleToggle?: (index: number) => void;
  noSwitcherSelected?: boolean;
  initialActiveButton?: number;
  tabSwitcherStyles?: CSSProperties;
  tabButtonStyles?: CSSProperties;
  isText?: boolean;
  isVertical?: boolean;
}

const Switcher: React.FC<TabSwitcherProps> = ({
  options,
  icons = [],
  handleToggle,
  noSwitcherSelected,
  isText = true,
  isVertical,
  tabSwitcherStyles,
  tabButtonStyles,
  initialActiveButton = 0
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveButton);

  useEffect(() => {
    setActiveIndex(initialActiveButton);
  }, [initialActiveButton]);

  const onToggle = (index: number) => {
    setActiveIndex(index);
    handleToggle?.(index);
  };

  const renderTabButton = (option: { title?: string; url?: string }, index: number) => {
    const isActive = activeIndex === index && !noSwitcherSelected;

    if (isVertical && !isText) {
      // Render your vertical switcher without text here
      return (
        <TabButton
          isText={isText}
          style={tabButtonStyles}
          key={index}
          onClick={() => onToggle(index)}
          className={`switcher-tab-button ${isActive ? 'activated' : ''}`}
          isActive={isActive}
        >
          {icons[index] && (
            <BaseSwitcherIcon height="16" width="16">
              {icons[index]}
            </BaseSwitcherIcon>
          )}
        </TabButton>
      );
    } else {
      // Existing horizontal switcher with text
      return (
        <TabButton
          isText={isText}
          style={tabButtonStyles}
          key={index}
          onClick={() => onToggle(index)}
          className={`switcher-tab-button ${isActive ? 'activated' : ''}`}
          isActive={isActive}
        >
          <ButtonTypography className="switcher-text">
            {icons[index] && (
              <BaseSwitcherIcon height="16" width="16">
                {icons[index]}
              </BaseSwitcherIcon>
            )}
            {isText && option.title}
          </ButtonTypography>
        </TabButton>
      );
    }
  };

  return (
    <TabSwitcher style={tabSwitcherStyles} isVertical={isVertical}>
      {options.map((option, index) =>
        option.url ? (
          <Link
            href={option.url}
            key={index}
            style={{
              width: '100%',
              textDecoration: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'inherit'
            }}
          >
            {renderTabButton(option, index)}
          </Link>
        ) : (
          renderTabButton(option, index)
        )
      )}
    </TabSwitcher>
  );
};

export default Switcher;

import Switcher from '@/components/Atoms/Switcher/Switcher';
import { buttonStyles, containerStyles, switcherStyles } from './CasinoSportStyles';
import { icons } from './CasinoSportSvgPath';
import { memo } from 'react';

const CasinoSport: React.FC<{
  isMobile: boolean;
  handleSwitcherToggle: (index: number) => void;
  open: boolean;
  initialActiveButton: number;
  authenticated?: boolean;
  switcherOptions: {
    title: string;
    url: string;
  }[];
}> = memo(
  ({
    handleSwitcherToggle,
    open,
    switcherOptions,
    initialActiveButton,
    authenticated: isAuthenticated
  }) => {
    return (
      <div data-testid="CasinoSport" style={containerStyles(isAuthenticated)}>
        <Switcher
          options={switcherOptions}
          isVertical={!open}
          isText={open}
          tabSwitcherStyles={switcherStyles(open)}
          tabButtonStyles={buttonStyles(open)}
          icons={icons}
          handleToggle={handleSwitcherToggle}
          initialActiveButton={initialActiveButton}
        />
      </div>
    );
  }
);

CasinoSport.displayName = 'CasinoSport';

export default CasinoSport;

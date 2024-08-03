import { ReactNode } from 'react';
import { BonusDarkButtonContainer } from './BonusDarkButtonStyle';

export const BonusDarkButton = ({ children }: { children: ReactNode }) => {
  return (
    <BonusDarkButtonContainer data-testid="bonus-dark-btn">{children}</BonusDarkButtonContainer>
  );
};

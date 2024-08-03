import { ReactNode } from 'react';
import { OutlinedButtonContainer } from './OutlinedButtonStyle';

export const OutlinedButton = ({ children }: { children: ReactNode }) => {
  return (
    <OutlinedButtonContainer data-testid="outlined-button">{children}</OutlinedButtonContainer>
  );
};

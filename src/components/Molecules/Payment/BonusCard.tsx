import { ReactNode, useState } from 'react';
import { Grid } from '@mui/material';
import { InfoIcon } from '@/components/Atoms/InfoIcon';
import { FirstBonusIcon, SecondBonusIcon } from './BonusIcons';
import { BonusButton, BonusContainer, BonusTitle } from './BonusStyle';
import { Hint, TextComponent } from '@/components/Atoms';
import { OutlinedButton } from './OutlinedButton';

type BonusProps = {
  title?: string;
  icon?: 'first' | 'second';
  ghost?: boolean;
  children?: ReactNode;
};

export const BonusCard = ({ title, icon, ghost, children }: BonusProps) => {
  const [showAcceptScreen, setShowAcceptScreen] = useState(false);

  return (
    <BonusContainer ghost={showAcceptScreen || ghost} data-testid="bonus-container">
      {showAcceptScreen && (
        <Grid container>
          <Grid item xs={1}>
            <InfoIcon />
          </Grid>
          <Grid item xs={11}>
            <TextComponent
              variant="subtitle2"
              color="#fff"
              fontWeight={700}
              text="Some Long Bonus Name + 100% bonus up to $1200"
            />
          </Grid>
          <Grid xs={12} marginTop="10px">
            <Hint>
              20 Free Spins in 9 masks of fire Hyperspins on Registration and make your first
              deposit and get 100% bonus up to $1200
            </Hint>
          </Grid>
          <OutlinedButton>Got It</OutlinedButton>
        </Grid>
      )}
      {!showAcceptScreen && (
        <>
          {children && children}
          {!children && (
            <>
              <Grid container>
                {icon && (
                  <Grid item xs={4}>
                    {icon === 'first' ? <FirstBonusIcon /> : <SecondBonusIcon />}
                  </Grid>
                )}
                <Grid item xs={7}>
                  {title && <BonusTitle>{title}</BonusTitle>}
                  <BonusButton onClick={() => setShowAcceptScreen((sA) => !sA)}>ACCEPT</BonusButton>
                </Grid>
                <Grid container item xs={1} justifyContent="center">
                  <InfoIcon />
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </BonusContainer>
  );
};

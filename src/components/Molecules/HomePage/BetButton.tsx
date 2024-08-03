import React from 'react';
import { styled } from '@mui/material/styles';

import { ButtonComponent } from '../../Atoms/ButtonComponent';
import { TextComponent } from '../../Atoms/TextComponent';

const BetButtonStyled = styled(ButtonComponent)({
  padding: '18px 20px 16px 20px ',
  background: 'linear-gradient(180deg, var(--yellow) 0%, rgb(255, 189.25, 20.19) 99.48%)',
  borderRadius: '58px',
  display: 'flex',
  minWidth: '177px',
  marginRight: '21px',
  '@media screen and (max-width:1300px)': {},
  '@media screen and (max-width:1100px)': {
    minWidth: '95px',
    padding: '12px 10px',
    borderRadius: '37px'
  },
  '@media screen and (max-width:479px)': {
    minWidth: '80px'
  }
});

const BetButtonText = styled(TextComponent)({
  fontStyle: 'normal',
  color: 'var(--very-dark-violet-400)',
  fontWeight: 700,
  fontSize: 'var(--font-size-14)',
  boxShadow: '0px 0px 10px rgba(255, 222, 9, 0.7)',
  lineHeight: 'var(--l-height-13)',
  textAlign: 'center',
  letterSpacing: 'var(--lt-spacing)',
  textTransform: 'uppercase',
  flex: 'none',
  order: 1,
  flexGrow: 0,
  '@media screen and (max-width:1100px)': {
    fontSize: 'var(--font-size-11)',
    lineHeight: 'var(--l-height-12)',
    textAlign: 'center'
  }
});

type BetButtonProps = {
  text: string;
  onClick?: () => void;
  dataTestId?: string;
};

export const BetButton: React.FC<BetButtonProps> = ({ text, onClick, dataTestId }) => {
  return (
    <BetButtonStyled data-testid={dataTestId} onClick={onClick}>
      <BetButtonText text={text} />
    </BetButtonStyled>
  );
};

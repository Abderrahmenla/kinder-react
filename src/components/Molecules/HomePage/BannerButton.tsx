import React from 'react';
import { styled } from '@mui/material/styles';

import { ButtonComponent } from '../../Atoms/ButtonComponent';
import { TextComponent } from '../../Atoms/TextComponent';

const BetButtonStyled = styled(ButtonComponent)({
  width: '177px',
  background: 'linear-gradient(180deg, var(--yellow) 0%, rgb(255, 189.25, 20.19) 99.48%)',
  borderRadius: '58px',
  display: 'flex',
  height: '47px',
  marginRight: '21px',
  '@media screen and (max-width:1100px)': {
    borderRadius: '37px',
    padding: '12px 10px'
  },
  '@media screen and (max-width:400px)': {
    width: '95px'
  },
  '&:hover': {
    boxShadow: '0px 0px 10px rgba(255, 222, 9, 0.7)'
  }
});

const BetButtonText = styled(TextComponent)({
  fontStyle: 'normal',
  color: 'var(--very-dark-violet-400)',
  fontWeight: 700,
  fontSize: 'var(--font-size-14)',
  boxShadow: '0px 0px 10px rgba(255, 222, 9, 0.7)',
  lineHeight: 'var(--l-height-17)',
  textAlign: 'center',
  letterSpacing: '0.03em',
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

export const BannerButton: React.FC<BetButtonProps> = ({ text, onClick, dataTestId }) => {
  return (
    <BetButtonStyled data-testid={dataTestId} onClick={onClick}>
      <BetButtonText text={text} />
    </BetButtonStyled>
  );
};

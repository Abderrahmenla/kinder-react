import React from 'react';
import { styled } from '@mui/material/styles';
import { TextComponent } from '../../Atoms';
import Image from 'next/image';
import { assets } from '@/config/assets';

const LiveBetButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '29px',
  cursor: 'pointer'
});

const LiveText = styled(TextComponent)({
  color: 'var(--white)',
  fontSize: 'var(--font-size-14)',
  lineHeight: 'var(--l-height-16)',
  fontWeight: 700,
  cursor: 'pointer',
  marginLeft: '7px'
});

export const LiveButton = () => {
  return (
    <LiveBetButtonContainer>
      <Image width={26} height={26} alt="play" src={`${assets}/images/play.svg`} />
      <LiveText text="Live Bets" />
    </LiveBetButtonContainer>
  );
};

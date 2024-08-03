import React from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '../../Atoms/Container';
import { assets } from '@/config/assets';

const ChatContainer = styled(Container)({
  background: 'linear-gradient(180deg, var(--soft-violet2) 0%, var(--pure-blue) 100%)',
  borderRadius: '24px',
  height: '48px',
  width: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media screen and (max-width:1100px)': {
    height: '38px',
    width: '38px'
  },
  '@media screen and (max-width:479px)': {
    display: 'none',
    paddingRight: 0
  }
});

const ChatImage = styled('div')({
  backgroundImage: `url(${assets}/images/chat.svg)`,
  backgroundSize: '100% 100%',
  height: '24px',
  width: '23px',
  '@media screen and (max-width:1100px)': {
    height: '20px',
    width: '19px'
  }
});

export const ChatImageComponent: React.FC = () => {
  return (
    <ChatContainer data-testid="chat-container">
      <ChatImage data-testid="chat-image" />
    </ChatContainer>
  );
};

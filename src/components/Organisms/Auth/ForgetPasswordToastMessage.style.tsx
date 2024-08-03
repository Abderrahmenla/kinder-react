import styled from '@emotion/styled';
import { Button } from '../..';
import Typography from '@/components/Atoms/Typography/Typography';

export const Overlay = styled('div')({
  background: 'var(--very-dark-violet)',
  width: '100%',
  height: '100%',
  position: 'fixed',
  opacity: 1,
  top: 0,
  left: 0,
  transition: 'all .4s ease',
  zIndex: 1
});

export const MessageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  width: 360px;
  padding: 36px 24px;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  background: var(--very-dark-violet-200);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: (--white);
`;

export const ThankYouButton = styled(Button)`
  width: 100%;
`;

export const TextComponent = styled(Typography)`
  color: var(--white);
  text-align: center;
  padding: 29px 0px;
`;

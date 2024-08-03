import styled from '@emotion/styled';
import Typography from '../Typography/Typography';

const toastColor = {
  success: '--tealish-green',
  error: '--pure-red',
  warning: '--yellow-4'
};

export const CustomToastOverlay = styled('div')`
  background: var(--very-dark-violet);
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 1;
  top: 0;
  left: 0;
  transition: all 0.4s ease;
  zindex: 1;
`;

export const MessageContainer = styled('div')<{ messageType: string }>`
  display: flex;
  padding: 30px;
  background-color: var(--very-dark-violet-200);
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 360px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  border-left: 1px solid
    var(${({ messageType }) => toastColor[messageType as keyof typeof toastColor]});
`;

export const MessageContent = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const MessageContentText = styled(Typography)`
  line-height: normal;
`;

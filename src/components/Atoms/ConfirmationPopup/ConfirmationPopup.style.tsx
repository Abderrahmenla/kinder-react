import styled from '@emotion/styled';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { SerializedStyles } from '@emotion/react';

export const ConfirmationPopupOverlay = styled('div')`
  background: var(--very-dark-violet-300);
  opacity: 0.93;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0.9;
  top: 0;
  left: 0;
  transition: all 0.4s ease;
  z-index: 9999;
`;

export const ConfirmationPopupContainer = styled('div')`
  padding: 31px 22px 16px 22px;
  border-radius: 6px;
  background: var(--very-dark-des-violet);
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ConfirmationPopupContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify: center;
  max-width: 291px;
  text-align: center;
`;
export const ConfirmationPopupTitle = styled(Typography)`
  line-height: 1;
  margin-top: 14px;
`;
export const ConfirmationPopupSubtitle = styled(Typography)`
  line-height: 1;
  margin-top: 8px;
`;
export const ConfirmationPopupButtonContainer = styled('div')`
  display: flex;
  gap: 12px;
`;

export const ConfirmationPopupButton = styled(Button)<{ buttonStyle?: SerializedStyles }>`
  margin-top: 50px;
  ${({ buttonStyle }) => buttonStyle}
`;

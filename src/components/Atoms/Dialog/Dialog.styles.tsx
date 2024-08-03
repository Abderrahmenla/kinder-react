import styled from '@emotion/styled';
import { useEffect } from 'react';
import { DialogProps } from '@/components/Atoms/Dialog/types/DialogTypes';
import { SerializedStyles } from '@emotion/react';

export const DialogWrapper = styled.div<{
  maxWidth?: number | string;
  containerStyles?: SerializedStyles;
}>`
  max-width: ${({ maxWidth }) =>
    maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : '470px'};
  width: 100%;
  overflow: hidden;
  background: var(--very-dark-violet-3);
  border-radius: 6px;
  transition: all 0.4s ease;
  max-height: 100vh;
  overflow-y: auto;
  position: relative;
  @media (max-width: 768px) {
    width: 95%;
  }
  ${({ containerStyles }) => (containerStyles ? containerStyles : '')}
`;
export const DialogContainer = styled.div<DialogProps>`
  ${(props) => {
    useEffect(() => {
      if (props.open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [props.open]);

    return `
      display: ${props.open ? 'flex' : 'none'};
      opacity: ${props.open ? 1 : 0};
      justify-content: center;
      align-items: ${props.notCentered ? 'flex-start' : 'center'};
      position: fixed;
      width: 100%;
      height: 100%;
      top: ${props.isMobile ? -2 : 0}px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      overflow: none;
      transition: all .4s ease;
      z-index: ${props.open ? 1003 : -1};
      padding: 1vw;
      .wallet-modal-section {
        @media screen and (max-width: 768px) {
          padding-left: 0;
          padding-right: 0;
        }
      }
    `;
  }}
`;

export const DialogHeaderContainer = styled('div')<{ headerDivider?: boolean }>(
  ({ headerDivider }) => ({
    background: 'var(--very-dark-violet-200)',
    color: 'var(--white)',
    display: 'flex',
    padding: '10px 12px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '6px 6px 0 0',
    borderBottom: headerDivider ? '1px solid var(--very-dark-violet-300)' : 'none',
    fontSize: '14px'
  })
);

export const DialogHeaderLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: var(--white);
  img {
    width: 14px;
    height: 14px;
  }
  span {
    margin-left: 10px;
  }
`;

export const CloseIconContainerHeader = styled.div`
  cursor: pointer;
  display: flex;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

export const DialogBody = styled.div<{ bodyStyles?: SerializedStyles }>`
  padding: 20px;
  color: var(--white);
  ${({ bodyStyles }) => (bodyStyles ? bodyStyles : '')}
`;

export const DialogFooter = styled.div`
  padding: 10px 48px;
  color: var(--white);
  border-top: 1px solid var(--very-dark-violet);
`;

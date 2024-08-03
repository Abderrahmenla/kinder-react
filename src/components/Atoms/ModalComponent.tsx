import {
  CloseIconContainerHeader,
  ModalHeaderContainer,
  ModalHeaderLabel
} from './ModalComponentStyle';
import { CSSTransition } from 'react-transition-group';

import React from 'react';

export const CloseIcon = ({ fillColor = '#A391E2' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 13.05L6.75001 18.3C6.60001 18.45 6.42501 18.525 6.22501 18.525C6.02501 18.525 5.85001 18.45 5.70001 18.3C5.55001 18.15 5.47501 17.975 5.47501 17.775C5.47501 17.575 5.55001 17.4 5.70001 17.25L10.95 12L5.70001 6.74998C5.55001 6.59998 5.47501 6.42498 5.47501 6.22498C5.47501 6.02498 5.55001 5.84998 5.70001 5.69998C5.85001 5.54998 6.02501 5.47498 6.22501 5.47498C6.42501 5.47498 6.60001 5.54998 6.75001 5.69998L12 10.95L17.25 5.69998C17.4 5.54998 17.575 5.47498 17.775 5.47498C17.975 5.47498 18.15 5.54998 18.3 5.69998C18.45 5.84998 18.525 6.02498 18.525 6.22498C18.525 6.42498 18.45 6.59998 18.3 6.74998L13.05 12L18.3 17.25C18.45 17.4 18.525 17.575 18.525 17.775C18.525 17.975 18.45 18.15 18.3 18.3C18.15 18.45 17.975 18.525 17.775 18.525C17.575 18.525 17.4 18.45 17.25 18.3L12 13.05Z"
        fill={fillColor}
      />
    </svg>
  );
};

export const ModalHeader: React.FC<
  React.PropsWithChildren & { onClose?: () => any; style?: React.CSSProperties }
> = ({ children, onClose, style }) => {
  return (
    <ModalHeaderContainer style={style}>
      <ModalHeaderLabel>{children}</ModalHeaderLabel>
      <CloseIconContainerHeader onClick={onClose}>
        <CloseIcon />
      </CloseIconContainerHeader>
    </ModalHeaderContainer>
  );
};

export const ModalWrap = ({ children, open }: any) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={open}
      timeout={{ enter: 700, exit: 700 }}
      classNames="modal"
    >
      {children}
    </CSSTransition>
  );
};

export * from './ModalComponentStyle';

import React from 'react';
import {
  ConfirmationPopupButton,
  ConfirmationPopupButtonContainer,
  ConfirmationPopupContainer,
  ConfirmationPopupContent,
  ConfirmationPopupOverlay,
  ConfirmationPopupSubtitle,
  ConfirmationPopupTitle
} from './ConfirmationPopup.style';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { SerializedStyles } from '@emotion/react';

export interface ConfirmationPopupButtonProps {
  label: string;
  callback: () => void;
  buttonStyle?: SerializedStyles;
  buttonVariant?: 'Primary' | 'Secondary' | 'Text' | 'Ternary';
}

export interface ConfirmationPopupProps {
  type: 'success' | 'warning' | 'error';
  title?: string;
  subtitle?: string;
  buttons?: ConfirmationPopupButtonProps[];
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  type,
  title,
  subtitle,
  buttons
}) => {
  return (
    <>
      <ConfirmationPopupOverlay />
      <ConfirmationPopupContainer>
        <ConfirmationPopupContent>
          <Image
            src={`${assets}/images/toast-icon-${type}.svg`}
            alt={`${type} svg-icon`}
            height={48}
            width={48}
            loading="lazy"
          />
          {title && (
            <ConfirmationPopupTitle size="h4" color="var(--darker-white)">
              {title}
            </ConfirmationPopupTitle>
          )}
          {subtitle && (
            <ConfirmationPopupSubtitle size="b2" color="var(--darker-white)">
              {subtitle}
            </ConfirmationPopupSubtitle>
          )}
        </ConfirmationPopupContent>
        <ConfirmationPopupButtonContainer>
          {buttons?.map((button) => {
            return (
              <ConfirmationPopupButton
                key={`button-${button.label}`}
                handleClick={button.callback}
                variant={button.buttonVariant}
                buttonStyle={button.buttonStyle}
              >
                {button.label}
              </ConfirmationPopupButton>
            );
          })}
        </ConfirmationPopupButtonContainer>
      </ConfirmationPopupContainer>
    </>
  );
};

export default ConfirmationPopup;

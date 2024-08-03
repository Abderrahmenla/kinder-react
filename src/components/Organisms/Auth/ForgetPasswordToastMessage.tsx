import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { assets } from '@/config/assets';
import Image from 'next/image';
import XIcon from '@/components/Atoms/XIcon';
import { useTranslations } from '@/hooks/useTranslations';
import {
  MessageContainer,
  Overlay,
  TextComponent,
  ThankYouButton
} from './ForgetPasswordToastMessage.style';

export interface CustomToastProps {
  onClose: VoidFunction;
}

export const ForgetPasswordToastMessage: FC<CustomToastProps> = ({ onClose = () => null }) => {
  const { t } = useTranslations();

  useEffect(() => {
    setTimeout(() => onClose(), 3000);
  }, [onClose]);

  const CloseButton = (
    <Box display="flex" justifyContent="flex-end" width={'100%'}>
      <div style={{ cursor: 'pointer' }} onClick={onClose}>
        <XIcon onClick={onClose} />
      </div>
    </Box>
  );

  return (
    <>
      <Overlay />
      <MessageContainer>
        {CloseButton}
        <Image
          src={`${assets}/images/mark-email-read.svg`}
          alt="message-sent"
          height={50}
          width={50}
          loading="lazy"
        />
        <TextComponent size="b1" type="Body">
          {t('forgotPasswordSent')}
        </TextComponent>
        <ThankYouButton size="Medium" handleClick={onClose} showIcon={false}>
          {t('thankYou')}!
        </ThankYouButton>
      </MessageContainer>
    </>
  );
};

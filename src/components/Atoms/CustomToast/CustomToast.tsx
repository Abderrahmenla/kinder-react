import { FC, useCallback, useEffect, useState } from 'react';
import { assets } from '@/config/assets';
import XIcon from '../XIcon';
import Image from 'next/image';
import {
  CustomToastOverlay,
  MessageContainer,
  MessageContent,
  MessageContentText
} from './CustomToast.style';

export interface CustomToastProps {
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning';
  persist?: boolean;
  onClose?: () => void;
}

export const CustomToast: FC<CustomToastProps> = ({
  message,
  duration,
  type = 'success',
  persist = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {}
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    if (!persist) {
      const timeoutId = setTimeout(() => setShow(false), duration);

      return () => clearTimeout(timeoutId);
    }
  }, [message, duration, persist]);

  const handleCloseToastMessage = useCallback(() => {
    setShow(false);
    onClose();
  }, [onClose]);

  return show ? (
    <>
      <CustomToastOverlay onClick={() => setShow(false)} />
      <MessageContainer messageType={type}>
        <div style={{ cursor: 'pointer' }} onClick={handleCloseToastMessage}>
          <XIcon onClick={handleCloseToastMessage} />
        </div>
        <MessageContent>
          <Image
            src={`${assets}/images/toast-icon-${type}.svg`}
            alt={`${type} svg-icon`}
            height={25}
            width={25}
            loading="lazy"
          />
          <MessageContentText size="h5" color="var(--darker-white)">
            {message}
          </MessageContentText>
        </MessageContent>
      </MessageContainer>
    </>
  ) : null;
};

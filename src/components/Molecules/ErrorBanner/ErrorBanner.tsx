import { useState } from 'react';
import Button from '../../Molecules/Button';
import { ErrorBannerWrapper } from '@/components/Molecules/ErrorBanner/ErrorBanner.styles';

interface ErrorBannerProps {
  message: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  const [hideBanner, setHideBanner] = useState<boolean>(false);

  const closeNotification = () => {
    setHideBanner(true);
  };

  if (hideBanner) return null;

  return (
    <ErrorBannerWrapper>
      <p>{message}</p>
      <Button
        dataTestId="cookies_button_accept"
        text="OK"
        onClick={closeNotification}
        collapsible={false}
      />
    </ErrorBannerWrapper>
  );
};

export default ErrorBanner;

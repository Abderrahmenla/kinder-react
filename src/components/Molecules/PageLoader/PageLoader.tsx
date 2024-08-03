import { useState, useEffect, ReactNode } from 'react';
import Router from 'next/router';
import Lottie from 'lottie-react';
import * as animationData from '../../../utils/logo.json';
import { LoadingWrapper } from '@/components/Molecules/PageLoader/PageLoader.style';

type LoadingProps = {
  children: ReactNode;
};

const PageLoader = ({ children }: LoadingProps) => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsAppLoading(false);
    };

    const timeout = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      clearTimeout(timeout);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <LoadingWrapper>
      {isAppLoading ? <Lottie className={'logo-loader'} animationData={animationData} /> : children}
    </LoadingWrapper>
  );
};

export default PageLoader;

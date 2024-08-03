import { useState } from 'react';
import Lottie from 'lottie-react';
import * as animationData from '@/utils/spinner.json';
import * as logoAnimationData from '@/utils/logo.json';
import * as coinLoaderData from '@/utils/coin-loader.json';
import { SpinnerWrapper } from '@/components/Molecules/PageLoader/PageLoader.style';
import { LoaderHook } from '@/hooks/types';

type LoaderType = 'default' | 'logo' | 'coin';

export const useLoader = (type: LoaderType = 'default'): LoaderHook => {
  const [isLoading, setIsLoading] = useState(false);

  let animation: any = animationData;
  if (type === 'logo') animation = logoAnimationData;
  if (type === 'coin') animation = coinLoaderData;

  const loadingWrapper = (
    <SpinnerWrapper>
      <Lottie className="data-loader" animationData={animation} async={true} />
    </SpinnerWrapper>
  );

  return { isLoading, toggleLoader: setIsLoading, loadingWrapper };
};

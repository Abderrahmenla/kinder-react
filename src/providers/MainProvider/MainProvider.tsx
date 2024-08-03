import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { IntercomProvider } from '../IntercomProvider';
import { RecoilRoot } from 'recoil';
import TrackingContextProvider from '../TrackingProvider';
import GameStatusContextProvider from '../GameStatusProvider';
import DeepLinkingProvider from '../DeepLinkingProvider';
interface Props {
  children: ReactNode;
  pageProps: AppProps['pageProps'];
}

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children }: Props) => (
  <RecoilRoot>
    <DeepLinkingProvider />
    <IntercomProvider>
      <TrackingContextProvider>
        <GameStatusContextProvider>{children}</GameStatusContextProvider>
      </TrackingContextProvider>
    </IntercomProvider>
  </RecoilRoot>
);

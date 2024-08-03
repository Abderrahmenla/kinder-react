import { PropsWithChildren, ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import MockRouter, { MockRouterProps } from '@/mocks/MockRouter';

const ProvidersWrapper = ({ nextRouter }: { nextRouter?: MockRouterProps }) => {
  return function AllTheProviders({ children }: PropsWithChildren) {
    return (
      <MockRouter {...nextRouter}>
        <RecoilRoot>{children}</RecoilRoot>
      </MockRouter>
    );
  };
};

interface CustomRenderOptions extends RenderOptions {
  nextRouter?: MockRouterProps;
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) =>
  render(ui, {
    wrapper: ProvidersWrapper({ nextRouter: options?.nextRouter }),
    ...options
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';

type ProvidersProps = {
  readonly children?: any;
};

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: ProvidersProps) => {
  return <body>{children}</body>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };

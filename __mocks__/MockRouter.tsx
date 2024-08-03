import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Router, { NextRouter } from 'next/router';
import * as React from 'react';

interface Props {
  asPath?: string;
  children: React.ReactNode;
  pathname?: string;
  push?: (newPath: string) => void;
  query?: Record<string, string>;
  replace?: (newPath: string) => void;
}

/**
 * Mocks the Next Router. This is useful for testing components that use the router.
 */
const MockRouter = ({
  children,
  push = jest.fn().mockResolvedValue(true),
  replace = jest.fn().mockResolvedValue(true),
  pathname = '/',
  query = {},
  asPath = pathname
}: Partial<Props>) => {
  const mockRouter = {
    asPath,
    pathname,
    prefetch: jest.fn().mockResolvedValue(jest.fn()),
    push,
    query,
    replace
  } as unknown as NextRouter;

  // @ts-expect-error - Mock Router
  Router.router = mockRouter;

  return <RouterContext.Provider value={mockRouter}>{children}</RouterContext.Provider>;
};

export default MockRouter;
export type { Props as MockRouterProps };

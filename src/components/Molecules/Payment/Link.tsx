import { LinkInfoIcon } from '@/components/Atoms/LinkInfoIcon';
import NextLink, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export const Link = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  return (
    <NextLink className="help-link" {...props} data-testid="underline-link">
      <LinkInfoIcon /> {children}
    </NextLink>
  );
};

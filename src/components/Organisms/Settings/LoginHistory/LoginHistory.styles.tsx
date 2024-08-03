import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled('div')<{ isMobile: boolean }>`
  background: ${({ isMobile }) => (isMobile ? 'var(--very-dark-violet-300)' : 'unset')};

  & tr:last-child {
    td.table-data:first-of-type {
      border-bottom-left-radius: 12px;
    }

    td.table-data:last-of-type {
      border-bottom-right-radius: 12px;
    }
  }
`;

export const headerStyles = css`
  & span.BodyText-b2 {
    font-size: var(--font-size-12);
    line-height: var(--l-height-15);
    letter-spacing: initial;
  }

  th.table-header-loginTime,
  th.table-header-logoutTime,
  th.table-header-ip {
    width: 30%;
  }
`;

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Tabs from '@/components/Atoms/Tabs/Tabs';
import Typography from '@/components/Atoms/Typography/Typography';

export const Container = styled('div')<{ isMobile: boolean }>`
  background: ${({ isMobile }) => (isMobile ? 'var(--very-dark-violet-300)' : 'unset')};
`;

export const ClipboardIconWrapper = styled('div')`
  cursor: pointer;
  margin: 5px 0 0 5px;
`;

export const Title = styled(Typography)({
  '& h5': {
    color: 'var(--white)',
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-17)',
    margin: 'unset'
  }
});

export const CustomTabs = styled(Tabs)<{ isMobile: boolean }>`
  margin: ${({ isMobile }) => (isMobile ? '0 0 16px 0' : '16px 0 12px')};
  & button {
    margin: unset;
    width: 86px;
    height: 36px;
    font-weight: 500;
    font-size: var(--font-size-14);
  }
`;

// DrawerComponent appears at 769px
export const rowStyles = css`
  height: 23px;

  span.BodyText-b2 {
    letter-spacing: initial;
  }

  .table-data span.BodyText-b2,
  .card-value span.BodyText-b2 {
    line-height: var(--l-height-17);
  }

  .card-label span.BodyText-b3 {
    line-height: var(--l-height-15);
  }

  '@media screen and (min-width: 769px)': {
    height: 48px;
  }
`;

export const headerStyles = css`
  & span.BodyText-b3 {
    letter-spacing: initial;
    line-height: var(--l-height-15);
  }

  th.table-header-placedTime,
  th.table-header-status {
    width: 25%;
  }

  th.table-header-game {
    width: 30%;
  }

  th.table-header-dateAndTime,
  th.table-header-amount,
  th.table-header-result {
    width: 20%;
  }
`;

export const greenBorder = css`
  border-left: 1px solid var(--tealish-green);
`;

export const yellowBorder = css`
  border-left: 1px solid var(--yellow-4);
`;

export const greenText = css`
  & span {
    color: var(--tealish-green);
  }
`;

export const yellowText = css`
  & span {
    color: var(--yellow-4);
  }
`;

export const actionButtonStyles = css`
  display: flex;
  justify-content: end;
  align-items: center;

  & span {
    margin-left: 8px;
    margin-top: 4px;
  }
`;

export const width25 = css`
  width: 25%;
`;

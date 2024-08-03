import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';

export const LimitsTableWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  '@media screen and (min-width: 769px)': {
    display: 'block'
  }
});

export const actionButtonStyles = css`
  .delete-button {
    padding: unset;

    @media screen and (min-width: 769px) {
      padding-right: 12px;
    }
  },
`;

export const headerStyles = css`
  height: 48px;

  span.BodyText-b3 {
    line-height: var(--l-height-15);
    letter-spacing: initial;
  }

  th[class*='table-header'] {
    max-width: 123px;
  }

  th.table-header-time,
  th.table-header-limitStatus,
  th.table-header-action {
    min-width: 80px;
  }

  th.table-header-value {
    max-width: 188px;
  }

  th.table-header-limitStatus,
  th.table-header-action {
    text-align: right;
  }
`;

export const rowStyles = css`
  height: 48px;

  td.table-data span {
    line-height: var(--l-height-17);
    letter-spacing: initial;
  }

  td[class*='table-data-limitStatus'] {
    text-align: right;
  }
`;

export const Card = styled('div')`
  border-radius: 12px;
  padding: 12px;
  background: var(--very-dark-violet-200);
`;

export const CardContentWrapper = styled('div')<{
  rowStyles: SerializedStyles | undefined;
}>`
  ${({ rowStyles }) => rowStyles}
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: var(--very-dark-violet-200);

  .card-row:first-of-type {
    width: 100%;
    height: fit-content;

    .delete-button {
      height: 20px;
      margin-bottom: 6px;
      margin-right: 2px;
      text-align: end;
    }
  }

  .card-row {
    .card-label {
      height: 20px;
      overflow: hidden;
    }
  }

  .card-row-limitType,
  .card-row-time {
    margin-top: 2px;
  }

  .card-row-dateActivated,
  .card-row-dateCreated {
    margin-top: 5px;
  }

  .card-row-value,
  .card-row-time,
  .card-row-dateActivated {
    div {
      text-align: end;
      overflow: overlay;
    }
  }
`;

export const CardRow = styled('div')({
  width: '50%',

  '.card-label > span': {
    lineHeight: 'var(--l-height-15)',
    letterSpacing: 'initial'
  },

  '.card-value > span': {
    lineHeight: 'var(--l-height-17)',
    letterSpacing: 'initial'
  }
});

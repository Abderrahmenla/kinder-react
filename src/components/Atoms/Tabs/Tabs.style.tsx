import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import Typography from '../Typography/Typography';

export const TabsContainer = styled('div')`
  display: flex;
  overflow: auto;
  gap: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const TabButton = styled('button')<{ isActive: boolean; buttonStyle?: SerializedStyles }>`
  padding: 10px 12px 10px 12px;
  border-radius: 6px;
  background: var(--very-dark-violet-300);
  border: unset;
  cursor: pointer;
  white-space: nowrap;

  ${(props) => (props.buttonStyle ? props.buttonStyle : '')}
  background: ${(props) =>
    props.isActive
      ? 'linear-gradient(90deg, var(--bluish-violet) 0%, var(--pure-blue) 103.89%)'
      : ''};

  &:hover {
    background: var(--very-dark-des-violet);
  }
`;

export const TabLabel = styled(Typography)`
  color: var(--darker-white);
`;

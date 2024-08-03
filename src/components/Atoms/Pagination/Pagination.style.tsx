import styled from '@emotion/styled';
import { PageOptionProps } from './Pagination.type';

export const PaginationContainer = styled('div')`
  display: flex;
  color: var(--darker-white);
  justify-content: base;
  align-items: center;
  margin-top: 12px;
`;

export const PaginationOption = styled('a')<PageOptionProps>`
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  background: ${(props) => (props.isActive ? 'var(--very-dark-des-violet)' : '')};
`;

export const PageIndex = styled('div')`
  margin: 0px 6px;
`;

export const PrevArrow = styled('a')`
  position: relative;
  padding: 8px 10px;
  cursor: pointer;
`;
export const NextArrow = styled('a')`
  padding-top: 5px;
  cursor: pointer;
`;

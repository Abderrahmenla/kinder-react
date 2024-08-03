import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import {
  getSizeStylesDropdown,
  DropdownContainerProps,
  getSizeStylesDropdownList
} from '../utils/getSizeStyles';

export const DropdownContainer = styled.div<DropdownContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: #211442;
  &:hover {
    background: #3c2a63;
  }
  $:active {
    background: #3c2a63;
  }
  /* Inject size prop styles */
  ${({ size }) => getSizeStylesDropdown(size)}/* Hover state */
`;

export const Icon = styled.img<{ rounded?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: ${({ rounded }) => (rounded ? '50%' : 'inherit')};
`;

export const IconContainer = styled.div<{ dropdown?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  height: ${({ dropdown }) => (dropdown ? 'auto' : '36px')};
  transition: background-color 0.3s;
`;

export const IconLabel = styled.p`
  color: #fafaff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  font-family: Inter;
  flex-direction: row;
  line-height: 20px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const DropDownListContainer = styled.div<{ isIcon?: boolean; isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => (props.isIcon ? '13px' : 0)};
  position: ${(props) => (props.isIcon ? 'absolute' : 'static')};
  overflow-y: auto;
  @media (max-width: 768px) {
    left: 3px;
  }
  @media (max-width: 430px) {
    left: -7px;
  }
  @media (max-width: 360px) {
    left: -20px;
  }
`;

export const DropDownPolygonContainer = styled.div<{ isVisible?: boolean; left?: string }>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  left: ${(props) => props.left};
  @media (max-width: 430px) {
    left: 90px;
  }
  @media (max-width: 355px) {
    left: 75px;
  }
`;

export const DropDownListWrapper = styled(motion.div)<{ isVisible?: boolean }>`
  opacity: ${(props) => (props.isVisible ? '1' : '0')} !important;
  max-height: ${(props) => (props.isVisible ? '2000px' : '0px')} !important;
  transition: all 1s ease;
`;

export const DropDownListItem = styled.div<{
  active?: boolean;
  size?: 'XL' | 'L' | 'M' | 'S';
  isCategoryHeader?: boolean;
  activeDropdownItem?: boolean;
}>`
  display: flex;
  width: 100%;
  height: 36px;
  gap: 4px;
  cursor: ${({ activeDropdownItem, isCategoryHeader }) =>
    activeDropdownItem ? (isCategoryHeader ? 'default' : 'pointer') : 'default'};
  align-items: center;
  ${({ size }) => getSizeStylesDropdownList(size)}
  background-color: ${({ active, isCategoryHeader }) =>
    active ? (isCategoryHeader ? 'transparent' : 'var(--dark-slate-blue)') : 'transparent'};
  &:hover {
    background-color: ${({ activeDropdownItem, isCategoryHeader }) =>
      activeDropdownItem && !isCategoryHeader ? 'transparent' : 'var(--dark-slate-blue)'};
    cursor: ${({ isCategoryHeader, activeDropdownItem }) =>
      activeDropdownItem ? (isCategoryHeader ? 'default' : 'pointer') : 'default'};
  }
  @media screen and (max-width: 768px) {
    padding: 7px 10px 8px 10px;
  }

  @media screen and (max-width: 480px) {
    padding: 7px 8px 8px 8px;
  }
`;

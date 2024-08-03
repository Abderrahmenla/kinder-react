import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/Atoms/Button/Button';

export const Divider = styled.div`
  border: 1px solid #27174f;
  width: 100%;
  border-radius: 3px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const drawerWidth = 270;

export const CategoryHeader = styled.div`
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0.5376px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const openedMixin = (isMobile?: boolean): string => `
  width: ${isMobile ? '100vw' : '260px'};
  background-color: #180C35;
  box-sizing: border-box;
  padding:  16px 8px 0px 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const closedMixin = (isMobile?: boolean): string => `
  display: flex;
  visibility: ${isMobile ? 'hidden' : 'visible'};
  align-items: center;
  padding:  16px 4px 0px 8px;
  width: 60px;
  background-color: #180C35;
  flex-direction: column;
`;

type DrawerProps = {
  isOpen: boolean;
  isMobile?: boolean;
};

export const Drawer = styled.div<DrawerProps>`
  position: fixed;
  height: 100%;
  display: flex;
  background-color: var(--very-dark-violet-300);
  z-index: 10;
  overflow-y: auto;
  scrollbar-gutter: stable;
  box-sizing: border-box;
  transition: width 300ms;
  left: 0;
  top: 0;
  ::-webkit-scrollbar {
    width: 0px;
  }
  scrollbar-width: none;
  ${({ isOpen, isMobile }) => (isOpen ? openedMixin(isMobile) : closedMixin(isMobile))}
`;

export const MenuItemContainer = styled.div<{ open: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${({ open }) => (open ? 'flex-start' : 'center')};
  padding-left: ${({ open }) => (open ? '12px' : '0')};
  align-items: center;
`;

export const styleDropdownListItemStyle = (open: boolean, isCategoryHeader: boolean) => ({
  width: open ? '100%' : '36px',
  alignItems: 'center',
  justifyContent: isCategoryHeader ? 'flex-start' : 'center',
  marginBottom: '8px',
  borderRadius: open ? '6px' : '36px',
  display: !open && isCategoryHeader ? 'none' : 'flex'
});

export const styleDropdown = (open: boolean, isMobile: boolean) => ({
  width: open ? '100%' : '36px',
  height: isMobile ? '44px' : '36px',
  marginBottom: '8px',
  borderRadius: open ? '6px' : '36px',
  paddingLeft: open ? '12px' : '10px'
});

export const styleDrawerDropdownContainer = (open: boolean): CSSProperties => ({
  width: '100%',
  display: open ? 'block' : 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
});

export const ReferAFriendButton = styled(Button)`
  color: var(--very-dark-violet);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
`;

export const FavouriteCounts = styled.span`
  color: var(--light-blue);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-left: 5px;
  line-height: 20px;
`;

export const ReferAFriendContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export const CircularButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  border-radius: 36px;
  background: linear-gradient(90deg, var(--grayish-orange) 0%, var(--yellow-6) 99.48%);
`;

export const ReferAFriendWrapper = styled.div`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: flex;
  justify-content: center;
`;

import styled from '@emotion/styled';

import Button from '@/components/Atoms/Button/Button';
import Link from 'next/link';
import { CSSProperties } from 'react';

export const NavBarContainer = styled.div<{
  isDrawerOpen: boolean;
}>`
  display: flex;
  position: fixed;
  z-index: 9;
  background-color: var(--very-dark-violet-3);
  top: 0;
  width: 100%;
  justify-content: space-between;
  height: 60px;
  padding-left: ${({ isDrawerOpen }) => (isDrawerOpen ? '300px' : '120px')};
  transition: padding-left 300ms;
  padding-right: 10px;
  @media (max-width: 900px) {
    padding-left: ${({ isDrawerOpen }) => (isDrawerOpen ? '16px' : '120px')};
  }
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  @media (max-width: 400px) {
    padding: 0 5px;
  }
`;

export const NavBarMenuContainer = styled.div`
  display: flex;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProfileCloseIconContainer = styled.div`
  cursor: pointer;
  display: flex;
`;

export const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 10px;
  & span {
    color: var(--darker-white);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const ProfileRankImageContainer = styled.div`
  display: flex;
  height: 40px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: var(--very-dark-violet-5);
`;
export const dropdownListStyle = {
  borderRadius: '6px',
  minWidth: '206px',
  background: 'var(--very-dark-violet-200)',
  left: '-40px',
  overflow: 'hidden'
};
export const getDropdownItemStyle = (item: any) =>
  item.title === 'profile'
    ? {
        height: '64px',
        background: 'var(--very-dark-violet-5)',
        borderBottom: '1px solid var(--very-dark-violet-5)',
        borderRadius: '6px 6px 0px 0px',
        padding: '8px 10px'
      }
    : { padding: item.key === 'logout' ? '8px 12px' : '8px 10px' };

export const ProfileSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoggedInMenuContainer = styled.div<{ isAuthenticated: boolean }>`
  display: ${({ isAuthenticated }) => (isAuthenticated ? 'flex' : 'none')};
  justify-content: space-between;
`;

export const ProfileSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconDiv = styled.div<{
  rakeback?: boolean;
  bgImage: string;
  isAuthenticated?: boolean;
}>`
  width: 43.2px;
  height: 43.2px;
  right: ${(props) => (props.rakeback ? '453px' : '0px')};
  position: ${(props) => (props.rakeback ? 'absolute' : 'inherit')};
  background: ${(props) => props.bgImage};
  border-radius: 50%;
  display: ${({ isAuthenticated }) => (isAuthenticated ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1100px) {
    right: ${(props) => (props.rakeback ? '400px' : '0px')};
  }
`;

export const IconHeaderContainer = styled.div<{ isAuthenticated?: boolean }>`
  display: ${({ isAuthenticated }) => (isAuthenticated ? 'flex' : 'none')};
  height: 48px;
  width: 48px;
  padding: 8px 14px 8px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  transition: 0.3s;
  cursor: pointer;
  background: var(--very-dark-violet-5);
  &:hover {
    background: var(--very-dark-des-violet);
    opacity: 0.7;
  }
`;

export const RackbackDialogBodyDisplayText = styled('div')`
  display: flex;
  flex-direction: row;
  height: 48px;
  width: 100%;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  justify-content: space-between;
  border-radius: 6px;
  background: var(--very-dark-des-violet);
`;

export const RackbackDialogBodyContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  justify-content: space-between;
`;
export const RackbackDialogHeader = {
  height: '40px',
  borderRadius: '6px 6px 0px 0px',
  background: 'var(--very-dark-violet-300)'
};

export const dialogBodyStyle: CSSProperties = {
  display: 'flex',
  padding: '16px 22px',
  flexDirection: 'column',
  borderRadius: '0px 0px 6px 6px',
  background: 'var(--very-dark-violet-3)'
};
export const IconRakebackHeaderContainer = styled(IconHeaderContainer)<{ isRakeback: boolean }>`
  background: var(--very-dark-violet-5);
  position: absolute;
  left: 138px;
  @media screen and (max-width: 571px) {
    position: relative;
    left: 0;
  }
`;

export const IconRakebackOpenHeaderContainer = styled(IconHeaderContainer)`
  background: var(--dark-violet);
`;
export const LogoContainer = styled(Link)<{ isMobile?: boolean; isAuthenticated?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    margin-right: ${({ isAuthenticated }) => (isAuthenticated ? '16px' : '0')};

    @media screen and (max-width: 571px) {
      margin-right: ${({ isAuthenticated }) => (isAuthenticated ? '13px' : '0')};
    }
    @media screen and (max-width: 400px) {
      margin-right: ${({ isAuthenticated }) => (isAuthenticated ? '5px' : '0')};
    }
  }
`;
export const WalletDropdownContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  justify-content: between;
  align-items: center;
  width: 100%;
  & > div {
    text-transform: uppercase;
    &:first-of-type {
      font-weight: 600;
    }
  }
`;
export const WalletButton = styled(Button)<{ isSmallerScreen?: boolean }>`
  display: flex;
  height: 36px;
  width: ${({ isSmallerScreen }) => (isSmallerScreen ? '40px' : '81px')};
  padding: ${({ isSmallerScreen }) => (isSmallerScreen ? '8px 10px' : '8px 16px')};
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--very-dark-violet);
  flex-shrink: 0;
  border-radius: 6px;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  line-height: normal;
`;

export const AuthButtonContainer = styled.div<{ isAuthenticated: boolean }>`
  display: ${({ isAuthenticated }) => (isAuthenticated ? 'none' : 'flex')};
  justify-content: flex-end;
  align-items: center;
`;

export const ButtonComponent = styled(Button)`
  height: 40px;
  width: 99px;
  color: var(--very-dark-violet);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  line-height: normal;
`;

export const GridContainer = styled.div<{ isDrawerOpen: boolean }>`
  display: grid;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  grid-template-columns: 1fr auto 1fr;
  transition: margin-left 0.4s ease-in-out;
  height: 68px;
`;

export const WalletDiv = styled.div<{ isUp: boolean }>`
  border: 1px solid var(--very-dark-des-violet);
  padding-left: 21px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1100px) {
    padding-left: 15px;
  }
`;

export const ProfileDropdownMobileContainer = styled.div<{ isExtended: boolean }>`
  position: fixed;
  display: ${({ isExtended }) => (isExtended ? 'flex' : 'none')};
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  flex-direction: column;
  background: var(--very-dark-violet-300);
  transition: width 500ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
`;

export const ProfileDropdownMobileHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 4px 12px 4px 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background: var(--very-dark-violet-3);
`;

export const profiledropdownListItemStyles = (item: any) => ({
  display: 'flex',
  padding: '12px 16px 12px 12px',
  alignItems: 'center',
  borderRadius: item.key === 'logout' ? '6px' : '6px 6px 0px 0px',
  background: '#211442',
  height: '44px',
  gap: '12px',
  alignSelf: 'stretch'
});

export const profiledropdownList = { padding: '12px 12px 0', gap: '4px' };

export const WalletAmount = styled.div`
  cursor: pointer;
  align-items: center;
  display: flex;
  margin-right: 8px;
  & span {
    font-weight: 500;
    font-size: var(--font-size-14);
    line-height: normal;
    font-family: Inter;
    color: var(--darker-white);
    @media (max-width: 360px) {
      font-size: var(--font-size-12);
    }
    @media (max-width: 300px) {
      font-size: var(--font-size-10);
    }
  }
`;

export const IconContainer = styled.div<{ isAuthenticated: boolean }>`
  display: ${({ isAuthenticated }) => (isAuthenticated ? 'flex' : 'none')};
  justify-content: space-between;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 1100px) {
    gap: 10px;

    > div {
      width: 32px;
      height: 32px;
      img {
        width: 17px;
        height: 17px;

        &:first-of-type {
          width: 22px;
          height: 17px;
        }
      }
    }
  }
`;

interface DropdownWrapperProps {
  isAnimating: boolean;
  showDropdown: boolean;
}

export const DropdownWrapper = styled.div<DropdownWrapperProps>`
  position: absolute;
  z-index: 4;
  right: 0px;
  width: 184px;
  background: var(--very-dark-violet-10);
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  top: ${(props) => (props.isAnimating ? '70px' : '65px')};
  height: ${(props) => (props.isAnimating ? 'auto' : '0')};
  transition: 0.3s all;
  overflow: hidden;
  opacity: ${(props) => (props.showDropdown ? '100%' : '0')};
  height: ${(props) => (props.showDropdown ? 'initial' : '0')};
  width: ${(props) => (props.showDropdown ? 'initial' : '0')};
`;

interface DropdownItemProps {
  isLastItem: boolean;
}

export const DropdownItem = styled.div<DropdownItemProps>`
  color: var(--soft-blue-100);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 28px;
  font-weight: 500;
  transition: all 0.2s, color 0.2s;
  font-size: 12px;
  border-top: ${(props) => (props.isLastItem ? '1px solid var(--dark-violet)' : 'none')};
  &:hover {
    color: white;
  }
`;

export const LogoImage = styled.img<{ isAuthenticated: boolean }>`
  width: 120px;
  height: 30px;
  margin-right: 16px;
  @media screen and (max-width: 571px) {
    width: ${({ isAuthenticated }) => (isAuthenticated ? '30px' : '120px')};
    margin-right: 13px;
  }
`;

export const AccountInfoDiv = styled.div<{ isAuthenticated: boolean }>`
  background: var(--very-dark-violet);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  min-width: 195px;
  padding: 8px 6px 8px 12px;
  flex-direction: row;
  display: ${({ isAuthenticated }) => (!isAuthenticated ? 'none' : 'flex')};
  -webkit-transition: all 0.4s, opacity 0.4s;
  -moz-transition: all 0.4s, opacity 0.4s;
  transition: all 0.4s, opacity 0.4s;
  @media screen and (max-width: 400px) {
    min-width: 190px;
  }
  @media screen and (max-width: 360px) {
    min-width: 160px;
  }
  @media screen and (max-width: 300px) {
    min-width: 80px;
  }
`;

export const UserBalanceContainer = styled.div<{ isUp: boolean }>`
  padding: 16px 0px 16px 22px;
  position: relative;
  width: 100%;
  background: var(--very-dark-violet-300);
  border: 1px solid var(--very-dark-des-violet);
  z-index: 5;
  border-radius: 0 0 24px 24px;
  border-top: none;
  display: ${({ isUp }) => (isUp ? 'block' : 'none')};
  @media screen and (max-width: 1100px) {
    padding: 10px 0px 14px 15px;
  }
`;
export const DropdownContainer = styled.div<{ isOpen: boolean }>`
  overflow: hidden;

  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 0.4s ease-in-out;
`;

export const UserBalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  & span {
    font-weight: 700;
    font-size: var(--font-size-14);
    line-height: var(--l-height-18);
    color: var(--white);
    @media screen and (max-width: 1100px) {
      font-size: var(--font-size-11);
      line-height: var(--l-height-10);
    }
  }
  & span:first-of-type {
    margin-right: 12px;
  }
  & span:last-child {
    color: var(--mod-blue-200);
    text-transform: uppercase;
    width: 134px;
    @media screen and (max-width: 1100px) {
      text-transform: unset;
      width: 100px;
    }
  }
`;

export const BalanceInfoContainer = styled.div<{ isWindowLarge: boolean; isWindowSmall: boolean }>`
  display: flex;
  align-items: center;
  font-size: ${({ isWindowLarge, isWindowSmall }) =>
    isWindowSmall ? '9px' : isWindowLarge ? '14px' : '11px'};
  padding-left: ${({ isWindowLarge }) => (isWindowLarge ? '20px' : '20px')};
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
`;

export const RakebackContainer = styled.div<{ isVisible?: boolean }>`
  background: var(--very-dark-des-violet);
  position: absolute;
  left: 138px;
  border-radius: 6px;
  padding: 0 0px 0 12px;
  flex-direction: row;
  border-right: none;
  height: 48px;
  min-width: 198px;
  align-items: center;
  justify-content: space-between;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  transition: display 0.4s ease-in-out;
`;

export const RakeBackNotification = styled.div<{ isDisplay?: boolean }>`
  display: ${({ isDisplay }) => (isDisplay ? 'block' : 'none')};
  width: 10px;
  height: 10px;
  border-radius: 41px;
  position: absolute;
  top: 0;
  right: 0;
  background: var(--Accent-Color-Accent-yellow, #ffd70c);
`;

export const RakeSpanText = styled.span`
  font-weight: 400;
  color: var(--soft-blue-100);
  font-size: var(--font-size-12);
  line-height: var(--l-height-16);
`;

export const RakeSpanValueContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RakeSpanArrow = styled.span`
  font-size: 13px;
  margin-top: -2px;
`;

export const RakeSpanValue = styled.span`
  color: var(--white);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

export const RakeClaimButton = styled(Button)<{
  greaterThanZero?: boolean;
  height?: number;
  width?: number;
}>`
  height: ${({ height }) => (height ? '36px' : 'auto')};
  width: ${({ width }) => (width ? '62px' : '100%')};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  font-family: Inter;
  margin-left: ${({ width }) => (width ? '14px' : 0)};
  margin-right: ${({ width }) => (width ? '6px' : 0)};
  line-height: 20px;
`;

export const RakeSpanClose = styled.span`
  width: 18px;
  margin-left: 8px;
  text-align: center;
  cursor: pointer;
`;
export const MenuDropdownContainer = styled.div`
  position: absolute;
  width: 100%;
  @media screen and (max-width: 431px) {
    width: 250px;
  }
  @media screen and (max-width: 360px) {
    width: 180px;
  }
`;

export const AccountMenuDropdownContainer = styled.div<{
  isMobile?: boolean;
  isExtended?: boolean;
}>`
  display: ${({ isExtended }) => (isExtended ? 'flex' : 'none')};
  position: absolute;
  right: 120px;
`;

export const Menudivider = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin: 0px 12px 0px 12px;
  border-left: 1px solid var(--very-dark-des-violet);
`;

export const CloseAccountProfile = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? 'inline-flex' : 'none')};
  position: absolute;
  top: 0;
  left: -43px;
  align-items: center;
  justify-content: center;
  padding: 14px;
  justify-content: center;
  align-items: center;
  border-radius: 16px 0px 0px 16px;
  background: var(--very-dark-violet-3);
`;

export const LeftSideMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuGroup = styled.div`
  display: flex;
  gap: 12px;
`;

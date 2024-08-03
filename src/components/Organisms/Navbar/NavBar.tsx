import React from 'react';
import { useRecoilValue } from 'recoil';
import { drawerState } from '@/components/state/drawerState';
import { NavBarContainer } from './NavBarStyles';
import { NavbarMenu } from './NavbarMenu';

export const NavBar: React.FC = () => {
  const isDrawerOpen = useRecoilValue(drawerState);

  return (
    <NavBarContainer className={'navbar-container'} isDrawerOpen={isDrawerOpen}>
      <NavbarMenu />
    </NavBarContainer>
  );
};

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Hamburger from '@/components/Molecules/Drawer/Hamburger';
import { drawerState } from '@/components/state/drawerState';
import { useRecoilState, useRecoilValue } from 'recoil';
import CasinoSport from '../../Molecules/Drawer/CasinoSport';
import { Drawer } from './Drawer.style';
import CountryLocaleDropdown from './CountryLocaleDropdown';
import { ReferAFriend } from './ReferAFriendButton';
import { DrawerDropdown } from './DrawerDropdown';
import { useRouter } from 'next/router';
import { useTranslations } from '@/hooks/useTranslations';
import { authState } from '@/components/state/isAuthenticated';
import { openPromotionsState } from '@/components/state/openPromotionsState';
import { MenuItem } from './Drawer.type';
import { CountryLocaleInfo } from './CountryLocaleDropdown/CountryLocaleDropdown.type';

const defaultDropdownState = { Casino: false, Sports: false, Promotions: true };

export const DrawerComponent: React.FC<{
  isMobile?: boolean;
  navigation: MenuItem[];
  locales: CountryLocaleInfo[];
}> = memo(({ isMobile = false, navigation = [], locales = [] }) => {
  const { t } = useTranslations();
  const { isAuthenticated } = useRecoilValue(authState);
  const [open, setOpen] = useRecoilState(drawerState);
  const router = useRouter();
  const [switcherItemIndex, setSwitcherItemIndex] = useState(-1);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(defaultDropdownState);
  const [, setOpenPromotionsState] = useRecoilState(openPromotionsState);

  const switcherData = useMemo(
    () => [
      { title: t('casino'), url: '/casino' },
      { title: t('sports'), url: '/sports' }
    ],
    [t]
  );

  useEffect(() => {
    let currentPath: string;
    if (router.pathname.includes('[categoryName]')) currentPath = router.asPath;
    else currentPath = router.pathname;
    if (
      currentPath.includes('casino') ||
      currentPath.includes('sports') ||
      currentPath.includes('promotions')
    ) {
      const activeSwitcherIndex = switcherData.findIndex((entry) =>
        currentPath.includes(entry.url)
      );

      setSwitcherItemIndex((prevSwitcherItemIndex) => {
        return prevSwitcherItemIndex !== activeSwitcherIndex
          ? activeSwitcherIndex
          : prevSwitcherItemIndex;
      });

      const updatedOpenDropdowns = {
        Casino: currentPath.includes('casino'),
        Sports: currentPath.includes('sports'),
        Promotions: currentPath.includes('promotions')
      };
      setOpenDropdowns(updatedOpenDropdowns);
    }
  }, [router.asPath, router.pathname]);

  const handleToggleDropdown = useCallback((title: string) => {
    setOpenDropdowns((prev: any) => ({ ...prev, [title]: !prev[title] }));
  }, []);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleCloseDropdown = () => {
    setOpenDropdowns({});
  };

  const handleSwitcherToggle = useCallback(
    (index: number) => {
      const data = switcherData[index];
      if (data) {
        setSwitcherItemIndex(index);
        setOpenDropdowns((prev) => ({
          ...prev,
          Casino: data.title === 'Casino',
          Sports: data.title === 'Sports'
        }));
        if (isMobile) {
          setOpen(false);
        }
      }
    },
    [setSwitcherItemIndex]
  );

  return (
    <Drawer className={'drawer'} isOpen={open} data-testid="Drawer" isMobile={isMobile}>
      <Hamburger open={open} onClick={handleDrawerOpen} isMobile={isMobile} />
      <CasinoSport
        initialActiveButton={Number(switcherItemIndex)}
        authenticated={isAuthenticated}
        switcherOptions={switcherData}
        isMobile={isMobile}
        open={open}
        handleSwitcherToggle={handleSwitcherToggle}
      />
      {isAuthenticated && <ReferAFriend open={open} />}
      {/*{isAuthenticated && <EasterDrawerNav open={open} />}*/}

      {/* Main menu */}
      {navigation?.map((item: MenuItem, index: React.Key) => (
        <DrawerDropdown
          item={item}
          isMobile={isMobile}
          open={open}
          setOpenPromotions={setOpenPromotionsState}
          key={index}
          isAuthenticated={isAuthenticated}
          handleCloseDropdown={handleCloseDropdown}
          isVisible={openDropdowns[item?.title || ''] || false}
          handleToggleDropdown={() => handleToggleDropdown(item?.title || '')}
        />
      ))}

      <CountryLocaleDropdown open={open} isMobile={isMobile} countriesLocale={locales} />
    </Drawer>
  );
});

DrawerComponent.displayName = 'DrawerComponent';

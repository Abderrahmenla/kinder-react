import { drawerState } from '@/components/state/drawerState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MobileMenuList, MobileMenuWrapper } from './MobileBottomNav.styles';
import { openSearchModalState } from '@/components/state/openSearchModalState';
import { useMediaQuery } from '@mui/material';
import { firstTimeDepState } from '@/components/state/isFirstTimeDeposit';
import { FC, useState } from 'react';
import { SearchIcon } from '@/components/Molecules/Drawer/MobileMenuItem/MenuIcons/SearchIcon';
import { SportsIcon } from '@/components/Molecules/Drawer/MobileMenuItem/MenuIcons/SportsIcon';
import { MenuIcon } from '@/components/Molecules/Drawer/MobileMenuItem/MenuIcons/MenuIcon';
import { ChatIcon } from '@/components/Molecules/Drawer/MobileMenuItem/MenuIcons/ChatIcon';
import { CasinoBottomIcon } from '@/components/Molecules/Drawer/MobileMenuItem/MenuIcons/CasinoBottomIcon';
import { usePathname } from 'next/navigation';
import { MobileDrawerProps } from '@/components/Organisms/Drawer/MobileBottomNav/types/MobileDrawerTypes';
import { useTranslations } from '@/hooks/useTranslations';
import MenuItem from '@/components/Organisms/Drawer/MobileBottomNav/MenuItem';
import Image from 'next/image';
import { openRewardsModalState } from '@/components/state/openRewardsModalState';
import { assets } from '@/config/assets';

const MobileBottomNav: FC<MobileDrawerProps> = ({ isAuthenticated }) => {
  const { t } = useTranslations();
  const [open, setOpen] = useRecoilState(drawerState);
  const [activeMenuItem, setActiveMenuItem] = useState<string>('');
  const [openSearchModal, setOpenSearchModal] = useRecoilState(openSearchModalState);
  const [openRewardModal, setOpenRewards] = useRecoilState(openRewardsModalState);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (menuItem: string) => {
    if (activeMenuItem === menuItem) {
      setActiveMenuItem('');
    } else {
      setActiveMenuItem(menuItem);
    }
  };

  const isMobile = useMediaQuery('(max-width:600px)');
  const isMobile768 = useMediaQuery('(max-width:768px)');
  const isFirstTimeDeposit = useRecoilValue(firstTimeDepState);
  const pathname = usePathname();
  const menuLink = !pathname?.includes('/casino');

  if (isMobile && isFirstTimeDeposit) return null;

  return (
    <MobileMenuWrapper className={'mobile-drawer'} isMobile={isMobile768}>
      <MobileMenuList>
        <MenuItem isActive={open} text={t('menu')} icon={<MenuIcon />} onClick={handleDrawerOpen} />
        <MenuItem
          isActive={openSearchModal?.open}
          text={t('searchMenu')}
          icon={<SearchIcon />}
          onClick={() => {
            setOpenSearchModal({ open: !openSearchModal?.open });
            handleMenuItemClick('search');
          }}
        />
        {/* Conditional rendering for casino or sports link */}
        <MenuItem
          isActive={activeMenuItem === (menuLink ? 'casino' : 'sports')}
          text={t(menuLink ? 'casino' : 'sportsbook')}
          icon={menuLink ? <CasinoBottomIcon /> : <SportsIcon />}
          onClick={() => handleMenuItemClick(menuLink ? 'casino' : 'sports')}
          link={menuLink ? '/casino' : '/sports'}
        />
        <MenuItem
          isActive={activeMenuItem === 'chat'}
          text={t('chat')}
          icon={<ChatIcon />}
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.Intercom('show');
            }
          }}
        />
        {isAuthenticated && (
          <MenuItem
            isActive={openRewardModal?.open}
            text={t('rewards')}
            icon={
              <Image
                src={`${assets}/images/loggedIn-profile-images/rewards-mobile.svg`}
                width={16}
                height={16}
                alt="rewards icon"
                loading="lazy"
              />
            }
            onClick={() => {
              setOpenRewards((current) => ({ open: !current.open }));
              handleMenuItemClick('rewards');
            }}
          />
        )}
      </MobileMenuList>
    </MobileMenuWrapper>
  );
};
export default MobileBottomNav;

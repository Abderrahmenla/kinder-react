import React, { useCallback } from 'react';
import { Icon, IconContainer, IconLabel } from '@/components/Atoms/DropDown';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { playerState } from '@/components/state/playerState';
import { useRouter } from 'next/router';
import { openRewardsModalState } from '@/components/state/openRewardsModalState';
import { openVIPPageState } from '@/components/state/openVIPPageState';
import { ProfileDropdownMobile } from './ProfileDropdownMobile';
import { ProfileDropdownDesktop } from './ProfileDropdownDesktop';
import { ProfileDisplayData } from './ProfileDisplayData';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import useLogout from '@/hooks/useLogout';

type ProfileDropdownProps = {
  isExtended: boolean;
  setIsExtended: (isExtended: boolean) => void;
  vipProgramLevelIcon: string;
};

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isExtended,
  setIsExtended,
  vipProgramLevelIcon
}) => {
  const player = useRecoilValue(playerState);
  const isMobile = UseMediaQuery(768);
  const setOpenRewards = useSetRecoilState(openRewardsModalState);
  const router = useRouter();
  const setOpenVIP = useSetRecoilState(openVIPPageState);
  const { logout } = useLogout();

  const handleNavigation = useCallback(
    (url: string, title: string) => {
      if (title === 'Log out') {
        logout();
      } else if (title === 'VIP') {
        setOpenVIP({ open: true });
      } else if (title === 'Rewards') {
        setOpenRewards({ open: true });
      } else {
        router.push(url);
      }
    },
    [logout, setOpenRewards, router]
  );

  const renderProfileSection = useCallback(
    (imageUrl: string) => (
      <ProfileDisplayData imgProfile={imageUrl} userId={player?.id} userName={player?.userName} />
    ),
    [player]
  );

  const renderIconLabel = useCallback(
    (item: any) => (
      <IconContainer style={{ gap: '12px' }}>
        {item.icon && <Icon src={item.icon} />}
        <IconLabel style={{ fontSize: item.key === 'logout' ? '12px' : '14px' }}>
          {item.title}
        </IconLabel>
      </IconContainer>
    ),
    []
  );

  const renderDropdownItem = useCallback(
    (item: any) =>
      item.title === 'profile' ? renderProfileSection(vipProgramLevelIcon) : renderIconLabel(item),
    [renderProfileSection, renderIconLabel]
  );

  const handleItemClick = useCallback(
    (_: React.MouseEvent<HTMLDivElement, MouseEvent>, item: any) => {
      handleNavigation(item?.url, item?.title);

      setIsExtended(false);
    },
    [setOpenVIP, handleNavigation, setIsExtended]
  );
  return (
    <>
      {isMobile ? (
        <ProfileDropdownMobile
          isExtended={isExtended}
          setIsExtended={setIsExtended}
          vipProgramLevelIcon={vipProgramLevelIcon}
          handleItemClick={handleItemClick}
        />
      ) : (
        <ProfileDropdownDesktop
          isExtended={isExtended}
          renderContent={renderDropdownItem}
          isMobile={isMobile}
          handleItemClick={handleItemClick}
        />
      )}
    </>
  );
};

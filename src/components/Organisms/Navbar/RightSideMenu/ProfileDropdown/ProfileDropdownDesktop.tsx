import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { DropDownList } from '@/components/Atoms/DropDown';
import { loggedInProfileDropdownData } from '../../../Drawer/menuData/data';
import { assets } from '@/config/assets';
import {
  getDropdownItemStyle,
  dropdownListStyle,
  AccountMenuDropdownContainer
} from '../../NavBarStyles';
import { useRouter } from 'next/router';

type ProfileDropdownDesktopProps = {
  isExtended: boolean;
  isMobile: boolean;
  renderContent: (item: any) => ReactNode;
  handleItemClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: any) => void;
};

export const ProfileDropdownDesktop: React.FC<ProfileDropdownDesktopProps> = ({
  isExtended,
  renderContent,
  isMobile,
  handleItemClick
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: any) => {
    const activeIndex = loggedInProfileDropdownData.findIndex(
      (loggedInItem) => loggedInItem.key === item.key
    );
    setActiveIndex(activeIndex);
    handleItemClick(e, item);
  };

  const findActiveIndex = useCallback(() => {
    const { asPath } = router;
    return loggedInProfileDropdownData.findIndex(
      (dropdownItem: any) => dropdownItem?.url === asPath
    );
  }, [router, loggedInProfileDropdownData]);

  useEffect(() => {
    setActiveIndex(findActiveIndex());
  }, [findActiveIndex]);
  return (
    <AccountMenuDropdownContainer isMobile={isMobile} isExtended={isExtended}>
      <DropDownList
        size="L"
        isVisible={isExtended}
        hasDropDownAnimation
        polygonLogoLeft="14px"
        activeIndex={activeIndex}
        activeDropdownItem={true}
        polygonLogoUrl={`${assets}/images/polygonIconNavbar.svg`}
        styleDropdownListItemStyle={getDropdownItemStyle}
        handleItemClick={(e, item) => item.title !== 'profile' && handleCardClick(e, item)}
        styleDropdownList={dropdownListStyle}
        dropdownItems={loggedInProfileDropdownData}
        isDropdownListLogo={true}
        renderContent={renderContent}
      />
    </AccountMenuDropdownContainer>
  );
};

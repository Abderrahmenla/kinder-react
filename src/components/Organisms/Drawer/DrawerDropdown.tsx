import { DropDown } from '@/components/Atoms/DropDown';
import React, { useCallback, useMemo } from 'react';
import {
  CategoryHeader,
  Divider,
  MenuItemContainer,
  styleDrawerDropdownContainer,
  styleDropdown,
  styleDropdownListItemStyle
} from './Drawer.style';
import { MenuItem } from './MenuItem';
import { useSetRecoilState } from 'recoil';
import { drawerState } from '@/components/state/drawerState';
import { useRouter } from 'next/router';
import { openPromotionsState } from '@/components/state/openPromotionsState';
import { DrawerDropdownProps } from './Drawer.type';
import { firstCharTolowercase, getDropdownItems } from '@/utils/navigationUtils';
import { useTranslations } from '@/hooks/useTranslations';
import { useFavoriteGames } from '@/hooks/useFavoriteGames';
import { transformUploadUrls } from '@/utils/transformAssetsUtil';

const renderDropdownContent = (
  contentProps: {
    title: string;
    icon: string;
    isCategoryHeader: boolean;
    url: string;
    isTranslation: boolean;
  },
  open: boolean,
  isMobile: boolean,
  favoriteGamesNumber: number,
  t: (key: string) => string
) => {
  const { title, icon, isCategoryHeader, url, isTranslation } = contentProps;
  const translatedTitle = isTranslation ? t(firstCharTolowercase(title)) : title;

  return isCategoryHeader && open ? (
    <CategoryHeader>{translatedTitle}</CategoryHeader>
  ) : (
    <MenuItem
      item={{ title: translatedTitle, icon, url }}
      open={open}
      dropdown={true}
      isMobile={isMobile}
      favoriteGamesNumber={favoriteGamesNumber}
    />
  );
};

export const DrawerDropdown: React.FC<DrawerDropdownProps> = ({
  open,
  isMobile,
  item,
  isVisible,
  handleToggleDropdown,
  handleCloseDropdown,
  isAuthenticated,
  setOpenPromotions
}) => {
  const setDrawerState = useSetRecoilState(drawerState);
  const { t } = useTranslations();
  const { favoriteGames } = useFavoriteGames();

  const handleCloseDrawer = () => {
    if (isMobile) setDrawerState(false);
  };
  const setPromotionState = useSetRecoilState(openPromotionsState);

  const handlePromotionsClick = (index: number) => {
    setOpenPromotions((prev) => ({ ...prev, open: prev.open }));
    setPromotionState({ open: true, promotionId: index });
  };

  const router = useRouter();
  const filteredDropdownItems = useMemo(() => {
    return getDropdownItems(item).filter((dropdownItem: any) => {
      return (isAuthenticated || !dropdownItem.isLoggedIn) && dropdownItem.title !== 'Default';
    });
  }, [isAuthenticated, item]);

  const findActiveIndex = useCallback(() => {
    const { pathname, asPath } = router;
    const currentPath = pathname.includes('[categoryName]') ? asPath : pathname;
    return filteredDropdownItems.findIndex(
      (dropdownItem: any) => dropdownItem?.url === currentPath
    );
  }, [router, filteredDropdownItems]);

  const handleItemClick = (item: any) => {
    handleCloseDrawer();
    if (handleCloseDropdown && !item.isSubmenu) {
      handleCloseDropdown();
    }
    handlePromotionsClick?.(item.id);
  };

  return (
    <React.Fragment>
      {item.divider && <Divider />}
      {item.subItems?.length || item.categories?.length ? (
        <DropDown
          onVisibilityChange={handleToggleDropdown}
          isVisible={isVisible}
          tooltipText={item.title}
          isTooltip={!open}
          activeDropdownItem={true}
          activeIndex={findActiveIndex()}
          style={styleDrawerDropdownContainer(open)}
          caret={open}
          dropdownItems={filteredDropdownItems}
          label={open ? item.title : ''}
          icon={!open ? transformUploadUrls(item.icon) : ''}
          styleDropdownListItemStyle={({ isCategoryHeader }) =>
            styleDropdownListItemStyle(open, isCategoryHeader)
          }
          handleItemClick={(_, item) => handleItemClick(item)}
          styleDropdown={styleDropdown(open, isMobile)}
          renderContent={({ title, icon, isCategoryHeader, url, isTranslation }) => {
            return renderDropdownContent(
              { title, icon, isCategoryHeader, url, isTranslation },
              open,
              isMobile,
              favoriteGames.length,
              t
            );
          }}
          size="L"
        />
      ) : item.icon || item.title || item.url || item?.customAction ? (
        <MenuItemContainer open={open} onClick={handleCloseDrawer}>
          <MenuItem item={item} open={open} dropdown={false} isMobile={isMobile} />
        </MenuItemContainer>
      ) : null}
    </React.Fragment>
  );
};

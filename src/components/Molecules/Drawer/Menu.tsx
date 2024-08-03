import React, { useState } from 'react';
import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, useMediaQuery } from '@mui/material';
import UpBottomCaret from '@/components/Atoms/UpBottomCaret';
import {
  CategoryTitle,
  Container,
  Icon,
  IconTextGroup,
  SubMenu
  // F1LeaderboardLiveButton
} from './MenuStyles';
import SubMenuItemC from './SubMenuItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useHover from '@/hooks/useHover';
import { useRecoilState } from 'recoil';
import { drawerState } from '@/components/state/drawerState';
import { useCloseDrawerOnSmallScreen } from '@/hooks/useCloseDrawerOnSmallScreen';
import { MenuItem } from '@/components/Organisms/Drawer/Drawer.type';

export enum MenuVariation {
  DEFAULT = 'default',
  CENTERED = 'centered',
  CENTERED_HOVER = 'centeredHover'
}

interface MenuProps {
  isDrawerOpen: boolean;
  effectsEnabled?: boolean;
  backgroundColor?: string;
  text?: string;
  icon?: string;
  variationProp?: MenuVariation;
  showCaret?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  subItems?: {
    icon: string;
    title: string;
    url: string;
    isDisabled?: boolean;
  }[];
  item?: MenuItem;
  onItemHover?: (itemTitle: string | null) => void;
  itemTitle?: string;
  isF1LeaderBoardLink?: boolean;
}

const Menu: React.FC<MenuProps> = ({
  isDrawerOpen,
  effectsEnabled = false,
  icon,
  text,
  variationProp = MenuVariation.DEFAULT,
  showCaret,
  item,
  onItemHover,
  itemTitle
  // isF1LeaderBoardLink = false
}) => {
  // const { t } = useTranslations();
  const [variation] = useState<MenuVariation>(variationProp);
  const [isSubHovered] = useState(false);
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover(
    effectsEnabled,
    onItemHover,
    itemTitle
  );
  const isBelow1301 = useMediaQuery('(max-width:1300px)');
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState);
  const router = useRouter();

  const hasSubItems = !!item?.subItems?.length;
  const hasActiveSubitem =
    item?.subItems?.some((subItem) => subItem.url === router.pathname) || false;
  const hasActiveSubCategory =
    item?.categories?.some((category) =>
      category.subItems.some((subItem) => subItem.url === router.pathname)
    ) || false;

  const [showSubLevels, setShowSubLevels] = useState(hasActiveSubitem || hasActiveSubCategory);

  const active = isHovered || showSubLevels;

  const centered =
    variation === MenuVariation.CENTERED || variation === MenuVariation.CENTERED_HOVER;
  const centeredHover = variation === MenuVariation.CENTERED_HOVER;

  const setIsMenuItemClicked = useCloseDrawerOnSmallScreen();
  // Current uncommented variables are for the leaderboard
  // const currentDate = new Date();

  // const comparisonDate = new Date(Date.UTC(2024, 1, 12));
  // const isOnOrAfter12thFeb2024 = currentDate >= comparisonDate;

  const subMenuItems = item?.subItems?.map((val, index) => (
    <SubMenuItemC key={index} index={index} isDrawerOpen={isDrawerOpen} {...val} />
  ));
  const subMenuCategories = item?.categories?.map((val, index) => {
    return (
      <div key={index}>
        {isDrawerOpen && <CategoryTitle>{val.name}</CategoryTitle>}
        {val.subItems.map((subItem, subIndex) => {
          return (
            <SubMenuItemC
              key={subIndex}
              index={subIndex}
              isDrawerOpen={isDrawerOpen}
              {...subItem}
            />
          );
        })}
      </div>
    );
  });

  const IconComponent = (
    <Icon effectsEnabled={effectsEnabled} isHovered={isHovered}>
      {icon && (
        <Image
          priority
          src={icon}
          alt="icon"
          style={{
            marginTop: 4
          }}
          width={27}
          height={27}
        />
      )}
    </Icon>
  );

  const ContainerComponent = (
    <Container
      data-testid="menu-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isActive={router.pathname === item?.url}
      onClick={(e) => {
        if (isBelow1301 && item?.url === router.pathname && drawerOpen) {
          setDrawerOpen(false);
        }
        if (item?.url && !hasSubItems) {
          router.push(item?.url);
          setIsMenuItemClicked(true);
        }
        if (isDrawerOpen && !isSubHovered && !!hasSubItems) {
          e.stopPropagation();
          setShowSubLevels(!showSubLevels);
        }
      }}
      isDrawerOpen={isDrawerOpen}
      isHovered={isHovered || active}
      centered={centered}
      centeredHover={centeredHover}
    >
      <IconTextGroup centered={centered}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          // To enable leaderboard drawer nav uncomment
          // onClick={() => {
          //   if (isF1LeaderBoardLink) {
          //     router.push('/leaderboard');
          //   } else {
          //     router.push(item?.url || '/');
          //   }
          // }}
          onClick={() => router.push(item?.url || '/')}
        >
          {isDrawerOpen || isSubHovered ? (
            IconComponent
          ) : (
            <Tooltip
              title={item?.title || ''}
              placement="right"
              arrow
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    color: 'white',
                    backgroundColor: '#301957',
                    left: 19,
                    borderRadius: 2,
                    height: 43,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 12,
                    paddingLeft: 2,
                    paddingRight: 2
                  },
                  '& .MuiTooltip-arrow': {
                    '&::before': {
                      backgroundColor: '#301957'
                    }
                  }
                }
              }}
            >
              {<Link href={item?.url || '/'}>{IconComponent}</Link>}
            </Tooltip>
          )}
          {isDrawerOpen && (
            <div>
              {text}
              {/* {isF1LeaderBoardLink && (
                <F1LeaderboardLiveButton isOnOrAfter12thFeb2024={isOnOrAfter12thFeb2024}>
                  {isOnOrAfter12thFeb2024 ? t('live') : t('soon')}
                </F1LeaderboardLiveButton>
              )} */}
            </div>
          )}
        </div>
        {isDrawerOpen && showCaret && (
          <UpBottomCaret height={7} width={8} isUp={showSubLevels} fill="#9D81EA" />
        )}
      </IconTextGroup>
      <AnimatePresence>
        {showSubLevels && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ duration: 0.5 }}
            exit={{ height: 0 }}
            key={'container'}
          >
            <SubMenu isDrawerOpen={isDrawerOpen}>
              <ul>{subMenuItems}</ul>
              <ul>{subMenuCategories}</ul>
            </SubMenu>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );

  return ContainerComponent;
};

export default Menu;

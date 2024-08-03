import { Tooltip, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { SubMenuContainer, SubMenuItem } from './MenuStyles';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeMenuItemState } from './../../state/menuActiveState';
import { useRouter } from 'next/router';
import { drawerState } from '@/components/state/drawerState';
import { useCloseDrawerOnSmallScreen } from '@/hooks/useCloseDrawerOnSmallScreen';
import { authState } from '@/components/state/isAuthenticated';

interface SubItemProps {
  title: string;
  icon: string;
  url: string;
  isDrawerOpen: boolean;
  index: number;
  isDisabled?: boolean;
}

const SubMenuItemC: React.FC<SubItemProps> = ({
  title,
  icon,
  url,
  isDrawerOpen,
  index,
  isDisabled = false
}) => {
  const [activeMenuItem, setActiveMenuItem] = useRecoilState(activeMenuItemState);
  const { isAuthenticated } = useRecoilValue(authState);
  const router = useRouter();
  const isBelow1301 = useMediaQuery('(max-width:1300px)');
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState);
  const setIsMenuItemClicked = useCloseDrawerOnSmallScreen();

  useEffect(() => {
    if (router.pathname === url) {
      setActiveMenuItem(url);
    }
  }, [router.pathname, url, setActiveMenuItem]);

  if (isDrawerOpen) {
    return (
      <>
        {isDisabled && !isAuthenticated ? null : (
          <SubMenuContainer
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuItem(url);
              setIsMenuItemClicked(true);
            }}
            href={url}
            data-testid={`submenu-item-${index}`}
          >
            <SubMenuItem isActive={activeMenuItem === url}>
              <Image priority src={icon} height={20} width={20} alt={title} />
              <span style={{ fontSize: 12 }}>{title}</span>
            </SubMenuItem>
          </SubMenuContainer>
        )}
      </>
    );
  }

  return (
    <>
      {isDisabled && !isAuthenticated ? null : (
        <Tooltip
          title={title || ''}
          placement="right"
          arrow
          PopperProps={{
            sx: {
              '& .MuiTooltip-tooltip': {
                color: 'white',
                backgroundColor: 'var(--very-dark-violet-50)',
                left: 4,
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
                  backgroundColor: 'var(--very-dark-violet-50)'
                }
              }
            }
          }}
        >
          <SubMenuContainer
            href={url}
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuItem(url);
              if (isBelow1301 && activeMenuItem === router.pathname && drawerOpen) {
                setDrawerOpen(false);
              }
            }}
          >
            <SubMenuItem
              style={
                activeMenuItem === url
                  ? {
                      position: 'relative',
                      paddingLeft: 4
                    }
                  : {
                      position: 'relative',
                      left: -4
                    }
              }
            >
              <div
                style={
                  activeMenuItem === url
                    ? {
                        position: 'absolute',
                        backgroundColor: '#301957',
                        borderRadius: 10,
                        width: 40,
                        height: 40,
                        zIndex: -1,
                        left: -7
                      }
                    : {}
                }
              ></div>
              <Image priority src={icon} height={20} width={20} alt={title} />
            </SubMenuItem>
          </SubMenuContainer>
        </Tooltip>
      )}
    </>
  );
};

export default SubMenuItemC;

import React from 'react';
import { Tooltip } from '@mui/material';
import { IconContainer, IconLabel, Icon } from '@/components/Atoms/DropDown';
import { FavouriteCounts } from './Drawer.style';
import { MenuItemProps } from './Drawer.type';
import { MenuItemLink, PopperProps } from './MenuItem.style';
import { triggerCustomAction } from '@/utils/navigationUtils';
import { useRecoilState } from 'recoil';
import { alternarInstanceState } from '@/components/state/altenarInstanceState';
import { transformUploadUrls } from '@/utils/transformAssetsUtil';

export const MenuItem: React.FC<MenuItemProps> = ({
  item,
  open,
  dropdown,
  favoriteGamesNumber
}) => {
  const [altenarInstance, setAltenarInstance] = useRecoilState(alternarInstanceState);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (item.customAction && item.customAction !== '') {
      e.preventDefault();
      triggerCustomAction(item.customAction);
    } else if (altenarInstance) {
      altenarInstance.remove();
      setAltenarInstance(undefined);
    }
  };

  const content = (
    <IconContainer dropdown={dropdown}>
      {item.icon && <Icon src={transformUploadUrls(item.icon)} alt={item.title || ''} />}
      {open && (
        <IconLabel>
          {item.title}{' '}
          <FavouriteCounts>
            {item.title === 'Favourites' && `(${favoriteGamesNumber})`}
          </FavouriteCounts>
        </IconLabel>
      )}
    </IconContainer>
  );

  return (
    <MenuItemLink href={item?.url || '#'} onClick={handleClick} isOpen={open}>
      {!open ? (
        <Tooltip title={item.title || ''} placement="right" arrow PopperProps={PopperProps}>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </MenuItemLink>
  );
};

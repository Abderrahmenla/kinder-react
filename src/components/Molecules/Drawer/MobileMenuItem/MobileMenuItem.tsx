import { FC } from 'react';
import { ItemText, ItemWrapper } from './MobileMenuItem.style';
import { MobileMenuItemProps } from '@/components/Organisms/Drawer/MobileBottomNav/types/MobileDrawerTypes';

const MobileMenuItem: FC<MobileMenuItemProps> = ({ text, isActive, icon, onClick, className }) => {
  const activeClass = isActive ? 'active' : '';

  return (
    <ItemWrapper className={`${className} ${activeClass}`} onClick={onClick}>
      {icon}
      <ItemText>{text}</ItemText>
    </ItemWrapper>
  );
};
export default MobileMenuItem;

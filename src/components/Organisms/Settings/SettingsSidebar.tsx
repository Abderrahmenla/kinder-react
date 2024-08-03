import React, { Dispatch, SetStateAction } from 'react';
import SettingsSidebarItem from '@/components/Molecules/Settings/SettingsSidebarItem/SettingsSidebarItem';
import { SettingAccountSidebar } from './SettingsSidebarStyle';
import { MenuItem } from '@/components/Templates/Settings/Settings.type';

interface SettingSidebarProps {
  menuItems: MenuItem[];
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>> | ((item: string) => void);
}

const SettingSidebar: React.FC<SettingSidebarProps> = ({
  menuItems,
  activeItem,
  setActiveItem
}) => {
  return (
    <SettingAccountSidebar>
      {menuItems.map((item, index) => (
        <SettingsSidebarItem
          key={index}
          href={item.slug}
          label={item.label}
          isActive={item.slug === activeItem}
          onClick={() => setActiveItem(item.slug)}
          imageComponent={item.imageComponent}
        />
      ))}
    </SettingAccountSidebar>
  );
};

export default SettingSidebar;

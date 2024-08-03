import React from 'react';
import MobileMenuItem from '@/components/Molecules/Drawer/MobileMenuItem/MobileMenuItem';
import Link from 'next/link';

const MenuItem = ({ isActive, text, icon, onClick, link = '' }) => {
  const content = (
    <MobileMenuItem
      className="menu-item"
      isActive={isActive}
      text={text}
      icon={icon}
      onClick={onClick}
    />
  );

  if (link) {
    return (
      <Link style={{ textDecoration: 'none' }} href={link}>
        {content}
      </Link>
    );
  }

  return content;
};

export default MenuItem;

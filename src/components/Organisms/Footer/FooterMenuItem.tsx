import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { FtMenuTitle, FtSubmenu, FtSubmenuItems, FtSubmenuDiv } from './Footer.styles';
import { FooterMenuItemProps } from './FooterTypes';

export const FooterMenuItem: React.FC<FooterMenuItemProps> = ({ title, links, children }) => {
  const { t } = useTranslations();

  return (
    <div>
      <FtMenuTitle size="b1" type="Body">
        {t(title)}
      </FtMenuTitle>
      <FtSubmenu>
        {links.map((link, index) => (
          <FtSubmenuItems key={index}>
            {link.img && (
              <Image
                width={12}
                height={12}
                src={link.img}
                alt="logo"
                style={{ marginRight: '10px' }}
              />
            )}
            {!link.disabled && (
              <>
                {link.text === 'Live Support' ? (
                  <FtSubmenuDiv onClick={() => window && window.Intercom('show')}>
                    {t(link.text)}
                  </FtSubmenuDiv>
                ) : (
                  <Link href={link.href} target={link.target}>
                    {t(link.text)}
                  </Link>
                )}
              </>
            )}
          </FtSubmenuItems>
        ))}
      </FtSubmenu>
      {children}
    </div>
  );
};

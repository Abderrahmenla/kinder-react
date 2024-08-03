import { IconProps } from '@/components/Atoms/Icons/Icon.types';
import { SidebarLink, SidebarText } from './SettingsSidebarItem.style';
import { ReactNode, useState } from 'react';
import { UseMediaQuery } from '@/hooks/useMediaQuery';

interface SidebarItemProps {
  href?: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  dataTestId?: string;
  imageComponent?: ({ width, height, fill }: IconProps) => JSX.Element;
  children?: ReactNode;
}

const SettingsSidebarItem: React.FC<SidebarItemProps> = ({
  href,
  label,
  isActive,
  dataTestId,
  imageComponent: ImageComponent,
  onClick
}) => {
  const [isHover, setIsHover] = useState(false);
  const isMobile = UseMediaQuery(768);
  return (
    <li className={isActive ? 'active' : ''} data-testid={dataTestId}>
      <SidebarLink
        href={href ? href : ''}
        as={`${href}`}
        onClick={onClick}
        isActive={isActive}
        isHover={isHover}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {ImageComponent && (
          <ImageComponent
            width="20"
            height="20"
            fill={(isActive || isHover) && !isMobile ? 'var(--white)' : 'var(--soft-blue-100)'}
          />
        )}
        <SidebarText size="b2">{label}</SidebarText>
      </SidebarLink>
    </li>
  );
};

export default SettingsSidebarItem;

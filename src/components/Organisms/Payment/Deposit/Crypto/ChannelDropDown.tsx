import React, { useEffect, useState } from 'react';
import {
  ChannelDropdownContainer,
  ChannelDropdownSection,
  ChannelDropdownStyle,
  ChannelLabel
} from './ChannelStyle';
import { Icon, IconContainer, IconLabel } from '@/components/Atoms/DropDown';
import { Crypto } from '@/components/state/payment/cryptoState';
import { useTranslations } from '@/hooks/useTranslations';

type ActiveItem = {
  image?: string;
  label?: string;
};
type T = any;

type ChannelDropDownProps = {
  dropdownItems: Crypto[];
  activeItem: ActiveItem;
  handleItemClick?:
    | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: T) => void)
    | undefined;
};

export const ChannelDropDown: React.FC<ChannelDropDownProps> = ({
  dropdownItems,
  activeItem,
  handleItemClick
}) => {
  const { t } = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = dropdownItems?.findIndex((item) => item.code === activeItem?.label);
    setActiveIndex(index !== -1 ? index : 0);
  }, [activeItem, dropdownItems]);

  return (
    <ChannelDropdownContainer>
      <ChannelDropdownSection>
        <ChannelLabel size="b3">{t('currency')}</ChannelLabel>
        <ChannelDropdownStyle
          styleDropdown={{ borderRadius: '0.375rem' }}
          closeDropdownListAfterItemClick={true}
          styleDropdownList={{
            position: 'absolute',
            minWidth: '170px',
            borderRadius: '6px',
            maxHeight: '241px',
            backgroundColor: 'var(--very-dark-des-violet)',
            left: '8px'
          }}
          dropdownItems={dropdownItems}
          label={activeItem?.label || ''}
          isDropdownListLogo={true}
          icon={activeItem.image || ''}
          iconRounded
          handleItemClick={handleItemClick}
          activeIndex={activeIndex}
          renderContent={(item) => (
            <IconContainer>
              {item.icon && <Icon src={item.icon} rounded />}
              <IconLabel>{item.code}</IconLabel>
            </IconContainer>
          )}
        />
      </ChannelDropdownSection>
    </ChannelDropdownContainer>
  );
};

export default ChannelDropDown;

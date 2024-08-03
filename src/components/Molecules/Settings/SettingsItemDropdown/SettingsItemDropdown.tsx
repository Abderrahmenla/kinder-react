import { useTranslations } from '@/hooks/useTranslations';
import {
  FormCurrencyListOption,
  FormCurrencySelectionLeft,
  FormCurrencyList,
  FormCurrencySelection,
  FormCurrencySelectionRight,
  FormGroupContainer,
  FormRow
} from './SettingsItemDropdownStyle';
import { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/config/assets';

interface MenuItem {
  label: string;
  href?: string;
  slug: string;
}

interface SettingsItemDropdownProps {
  menuItems: MenuItem[];
  activeItem: string;
  setActiveItem: (slug: string) => void;
}

const SettingsItemDropdown: React.FC<SettingsItemDropdownProps> = ({
  menuItems,
  activeItem,
  setActiveItem
}) => {
  const [isListVisible, setListVisibility] = useState(false);
  const { t } = useTranslations();
  const toggleListVisibility = () => {
    setListVisibility(!isListVisible);
  };

  const handleOptionClick = (slug: string) => {
    setActiveItem(slug);
    setListVisibility(false);
  };

  return (
    <FormGroupContainer>
      <FormRow>
        <FormCurrencySelection isListVisible={isListVisible} onClick={toggleListVisibility}>
          <FormCurrencySelectionLeft>
            <span>{activeItem}</span>
          </FormCurrencySelectionLeft>
          <FormCurrencySelectionRight>
            <Image alt="Arrow" width={11} height={8} src={`${assets}/images/arrowDown.svg`} />
          </FormCurrencySelectionRight>
        </FormCurrencySelection>
        <FormCurrencyList isVisible={isListVisible}>
          {menuItems.map((item, index) => (
            <FormCurrencyListOption key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick(item.slug);
                }}
                className={item.slug === activeItem ? 'active' : ''}
              >
                {t(item.label)}
              </a>
            </FormCurrencyListOption>
          ))}
        </FormCurrencyList>
      </FormRow>
    </FormGroupContainer>
  );
};

export default SettingsItemDropdown;

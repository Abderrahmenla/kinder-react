import React, { useState, useRef, useEffect } from 'react';
import {
  ProviderSelectContainer,
  ProviderHeader,
  ProviderListContainer,
  SearchInput,
  Option,
  ProviderSelectIcon,
  ProviderHeaderContainer,
  SearchInputContainer,
  ProviderListContainerWrapper
} from '@/components/Atoms/ProviderSelect/ProviderSelect.styles';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const ProviderSelect: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslations();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [containerRef]);

  const handleToggleDropdown = () => setIsOpen(!isOpen);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleProviderClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const getFilteredProviders = () => {
    return searchValue
      ? options.filter((option) => option.toLowerCase().includes(searchValue))
      : options;
  };

  return (
    <ProviderSelectContainer ref={containerRef}>
      <ProviderHeaderContainer onClick={handleToggleDropdown}>
        <ProviderHeader>{value || '...'}</ProviderHeader>
        <ProviderSelectIcon>
          <Image
            src={`${assets}/images/select-chevron.svg`}
            alt="select-chevron"
            width={20}
            height={20}
          />
        </ProviderSelectIcon>
      </ProviderHeaderContainer>
      {isOpen && (
        <ProviderListContainerWrapper>
          <ProviderListContainer>
            <SearchInputContainer>
              <SearchInput
                type="text"
                placeholder={t('searchProvider')}
                value={searchValue}
                onChange={handleSearch}
              />
              <Image
                src={`${assets}/images/select-search.svg`}
                alt={'select-search'}
                width={20}
                height={20}
              />
            </SearchInputContainer>
            {getFilteredProviders().map((option, index) => (
              <Option key={index} onClick={() => handleProviderClick(option)}>
                {option}
              </Option>
            ))}
          </ProviderListContainer>
        </ProviderListContainerWrapper>
      )}
    </ProviderSelectContainer>
  );
};

export default ProviderSelect;

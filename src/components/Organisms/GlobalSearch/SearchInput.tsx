import React, { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { CustomizeSearchInput, SearchInputContainer } from './GlobalSearchStyles';
interface SearchProps {
  onClick?: () => void;
  onSearch: (searchKey?: string) => void;
  standalone?: boolean;
  searchQuery: string; // Add the searchQuery prop
  setSearchQuery: (query: string) => void; // Add the setSearchQuery pro
}

export const SearchInput: React.FC<SearchProps> = ({ onSearch, searchQuery, setSearchQuery }) => {
  const { t } = useTranslations();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };
  return (
    <SearchInputContainer isFocused={isFocused}>
      <Image
        src={`${assets}/images/search-.svg`}
        alt="search"
        width={16}
        height={16}
        style={{ position: 'absolute', zIndex: 2, left: 40 }}
      />
      <CustomizeSearchInput
        type="text"
        onChange={handleInputChange}
        placeholder={t('searchYourGame')}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={searchQuery}
        size="lg"
        autoFocus
      />
    </SearchInputContainer>
  );
};

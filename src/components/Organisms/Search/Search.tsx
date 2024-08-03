import React from 'react';
import { styled } from '@mui/material/styles';
import { SearchInput } from '@/components/Molecules/Casino/SearchInput/SearchInput';
import { useTranslations } from '@/hooks/useTranslations';

const SearchContainer = styled('div')<{ standalone?: boolean }>(({ standalone }) => ({
  width: '735px',
  display: 'flex',
  position: 'relative',
  justifyContent: 'space-between',
  fontSize: '14px',
  zIndex: '3',
  '@media(max-width: 1000px)': {
    width: '100%'
  },
  '@media(max-width: 768px)': {
    display: standalone ? 'flex' : 'none'
  }
}));

interface SearchProps {
  onClick: () => void;
  onSearch: (searchKey?: string) => void;
  standalone?: boolean;
  searchQuery: string; // Add the searchQuery prop
  setSearchQuery: (query: string) => void; // Add the setSearchQuery pro
}

export const Search: React.FC<SearchProps> = ({
  onClick,
  onSearch,
  standalone,
  searchQuery,
  setSearchQuery
}) => {
  const { t } = useTranslations();

  return (
    <SearchContainer standalone={standalone}>
      <SearchInput
        onSearch={onSearch}
        onClick={onClick}
        placeholder={t('searchYourGame')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </SearchContainer>
  );
};

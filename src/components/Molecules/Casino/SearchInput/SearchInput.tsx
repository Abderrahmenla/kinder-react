import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { SearchButton } from '@/components/Atoms/SearchButton';

const TextInput = styled('input')({
  width: '100%',
  outline: 'none',
  padding: '15px 30px',
  borderRadius: '28px',
  backgroundColor: '#331C6B',
  border: 'none',
  fontSize: '14px',
  fontWeight: '900',
  color: 'var(--white)',
  '::placeholder': {
    color: 'var(--mod-blue-200)',
    fontWeight: '400'
  },
  '@media(max-width: 1000px)': {
    paddingLeft: '15px'
  }
});

interface SearchInputProps {
  placeholder: string;
  onClick: () => void;
  onSearch: (searchKey?: string) => void;
  searchQuery: string; // Add the searchQuery prop
  setSearchQuery: (query: string) => void; // Add the setSearchQuery prop
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onClick,
  onSearch,
  searchQuery,
  setSearchQuery
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update the search query state
    onSearch(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    onClick();
    onSearch(); // Invoke the onSearch prop when the search button is clicked
  };

  return (
    <>
      <TextInput
        type="text"
        onClick={onClick}
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        ref={inputRef}
        autoFocus
      />
      <SearchButton onClick={handleSearchButtonClick} />
    </>
  );
};

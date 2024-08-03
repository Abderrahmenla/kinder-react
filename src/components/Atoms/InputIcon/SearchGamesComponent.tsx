import React, { useEffect, useRef, useState } from 'react';
import {
  SearchComponent,
  SearchContainer,
  SearchIconWrapper,
  SearchIconContainer,
  SearchComponentWrapper
} from '@/components/Atoms/InputIcon/SearchGamesComponent.styles';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { SearchGamesComponentProps } from '@/components/Atoms/InputIcon/types/SearchGamesComponentTypes';

const SearchGamesComponent: React.FC<SearchGamesComponentProps> = ({
  value,
  onClick,
  type = 'text',
  label,
  icon,
  errorMsg,
  validated,
  required,
  placeholder,
  name,
  id,
  onChange,
  size = 'md',
  setSearchQuery
}) => {
  const [isOpen, setIsOpen] = useState<boolean | string>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  const handleIconClick = () => {
    setIsOpen(!isOpen);
    if (onClick) {
      onClick();
    }
  };

  const renderIcon = () => {
    return (
      <SearchIconWrapper>
        <Image src={icon} width={20} height={20} alt="icon" />
      </SearchIconWrapper>
    );
  };

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchQuery) {
      setSearchQuery(event.target.value);
    }
    onChange(event);
  };

  return (
    <SearchContainer>
      {label && (
        <label>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <SearchComponentWrapper isOpen={isOpen}>
        <SearchComponent size={size} isOpen={isOpen}>
          <SearchIconContainer onClick={handleIconClick} isOpen={isOpen}>
            {renderIcon()}
            {validated && (
              <Image
                src={`${assets}/images/checkmark-icon.svg`}
                width={16}
                height={16}
                data-testid="checkmark-icon"
                alt="checkmark-icon"
                style={{ marginLeft: '5px' }}
              />
            )}
          </SearchIconContainer>
          <input
            ref={inputRef}
            placeholder={placeholder}
            required={required}
            type={type}
            value={value}
            onChange={handleSearchTerm}
            className={`${errorMsg ? 'input-error' : ''} ${validated ? 'input-validated' : ''}`}
            name={name}
            id={id}
          />
        </SearchComponent>
      </SearchComponentWrapper>
    </SearchContainer>
  );
};

export default SearchGamesComponent;

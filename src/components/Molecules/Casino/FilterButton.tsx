import React, { MouseEventHandler, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ButtonIcon, ButtonText } from '@/components/Atoms';
import { Category } from '@/pages/api/casino/casinoTypes';
import { useRouter } from 'next/router';
import { FilterButtonContainer } from '@/components/Molecules/Casino/Casino.styles';
import { authState } from '@/components/state/isAuthenticated';
import { selectedCategoryState } from '@/components/state/categoryState';

interface FilterButtonContainerProps {
  onClick?: MouseEventHandler;
  label?: string;
  isActive?: boolean;
  categories?: any;
  onCategoryChange: (category: Category | string) => void;
  categoryName: string;
  providerName: string | undefined;
  favoriteGames: number | string | undefined;
}

export const FilterButton: React.FC<FilterButtonContainerProps> = ({
  label,
  categories,
  onCategoryChange,
  categoryName,
  providerName,
  favoriteGames
}) => {
  const router = useRouter();
  const [, setActiveIndex] = useState<number>(0);
  const { isAuthenticated } = useRecoilValue(authState);
  const selectedCategory = useRecoilValue(selectedCategoryState);

  const handleClick = (index: number, category: Category) => {
    if (selectedCategory === category.Name) return;

    setActiveIndex(index);
    const categoryName = category.Name.toLowerCase().replace(/ /g, '-');
    if (categoryName === 'lobby') {
      setActiveIndex(0);
      onCategoryChange('');
      router.push('/casino');
    } else {
      onCategoryChange(category);
      router.push(`/casino/${categoryName}`);
    }
  };

  return (
    <>
      {categories &&
        categories.map(
          (category: Category, index: number) =>
            !(category.Name === 'Favorites' && !isAuthenticated) && (
              <FilterButtonContainer
                key={index}
                isActive={
                  ((categoryName == undefined && category.Name === 'Lobby') ||
                    categoryName === category.Name.toLowerCase().replace(/ /g, '-')) &&
                  providerName == undefined
                }
                onClick={() => handleClick(index, category)}
                role="button"
                aria-label={label}
              >
                <ButtonIcon src={category.Icon.data.attributes.url} width={20} height={20} />
                <ButtonText>
                  {category.Name === 'Lobby' ? 'Lobby' : category.Name}{' '}
                  {isAuthenticated && category.Name === 'Favorites' && (
                    <span>({favoriteGames})</span>
                  )}
                </ButtonText>
              </FilterButtonContainer>
            )
        )}
    </>
  );
};

export default FilterButton;

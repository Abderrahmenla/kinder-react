import React from 'react';
import FilterButton from '@/components/Molecules/Casino/FilterButton';
import { Categories, Category } from '@/pages/api/casino/casinoTypes';
import { FilterContainer, FilterInnerContainer } from '@/components/Organisms/Filter/Filter.styles';

interface FilterProps {
  categories?: Categories;
  onCategoryChange: (category: Category | string) => void;
  categoryName?: string | any;
  providerName?: string | any;
  favoriteGames?: number | string | undefined;
}

const Filter: React.FC<FilterProps> = ({
  categories,
  onCategoryChange,
  categoryName,
  providerName,
  favoriteGames
}) => {
  return (
    <FilterContainer data-testid="filter-container">
      <FilterInnerContainer>
        <FilterButton
          label={'Filter Button'}
          categories={categories}
          onCategoryChange={onCategoryChange}
          categoryName={categoryName}
          providerName={providerName}
          favoriteGames={favoriteGames}
        />
      </FilterInnerContainer>
    </FilterContainer>
  );
};

export default Filter;

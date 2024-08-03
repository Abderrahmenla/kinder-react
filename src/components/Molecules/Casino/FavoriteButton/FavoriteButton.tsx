import React from 'react';
import FavoriteIcon from '@/components/Atoms/Icons/FavoriteIcon';
import { FavoriteContainer, FavoriteIconWrapper } from './FavoriteButton.style';
import { FavoriteProps } from './FavoriteButton.types';

const FavoriteButton: React.FC<FavoriteProps> = ({
  isFavorite,
  isAuthenticated,
  isMobile,
  isGameControl,
  isFavoriteColor = 'var(--yellow)',
  isNotFavoriteColor = 'var(--white)',
  toggleFavorite
}) =>
  isAuthenticated && (
    <FavoriteContainer isGameControl={isGameControl} onClick={toggleFavorite}>
      <FavoriteIconWrapper isMobile={!!isMobile} isFavorite={isFavorite}>
        <FavoriteIcon fill={isFavorite ? isFavoriteColor : isNotFavoriteColor} />
      </FavoriteIconWrapper>
    </FavoriteContainer>
  );

export default FavoriteButton;

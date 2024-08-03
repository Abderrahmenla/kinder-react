import dynamic from 'next/dynamic';
import React from 'react';
import { useFavoriteGames } from '@/hooks/useFavoriteGames';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import {
  GameControlDetailsWrapper,
  GameName
} from '@/components/Molecules/Casino/GameControlDetails/GameControlDetails.style';
import { GameControlDetailsProps } from './GameControlDetails.types';

const FavoriteButton = dynamic(
  () => import('@/components/Molecules/Casino/FavoriteButton/FavoriteButton')
);

export const GameControlDetails: React.FC<GameControlDetailsProps> = ({ isFullScreen, game }) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const { isFavorite, toggleFavorite } = useFavoriteGames();
  const { name, externalId } = game ?? { productName: '', name: '', externalId: '' };

  return (
    <GameControlDetailsWrapper isFullScreen={isFullScreen}>
      <FavoriteButton
        toggleFavorite={() => toggleFavorite(game)}
        isAuthenticated={isAuthenticated}
        isFavorite={isFavorite(externalId)}
        isNotFavoriteColor="var(--soft-violet)"
        isGameControl
      />
      <GameName type="Heading" size="b2" color="var(--white)">
        {name}
      </GameName>
    </GameControlDetailsWrapper>
  );
};

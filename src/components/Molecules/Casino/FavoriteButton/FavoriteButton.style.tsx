import styled from '@emotion/styled';
import { FavoriteContainerProps } from './FavoriteButton.types';

export const FavoriteContainer = styled('div')<FavoriteContainerProps>(({ isGameControl }) => ({
  display: isGameControl ? 'block' : 'flex',
  width: isGameControl ? 'auto' : '100%',
  justifyContent: isGameControl ? 'left' : 'center'
}));

export const FavoriteIconWrapper = styled.div<{ isMobile: boolean; isFavorite: boolean }>(
  ({ isMobile, isFavorite }) => ({
    display: 'flex',
    borderRadius: '12px',
    marginTop: isMobile ? '20px' : '0',
    padding: '6px',
    background: isMobile
      ? isFavorite
        ? 'rgba(21, 14, 37, 0.28)'
        : 'rgba(60, 42, 99, 0.40)'
      : 'none'
  })
);

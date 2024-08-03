import { useState } from 'react';
import { Game, GameSearchProps } from '@/pages/api/casino/casinoTypes';
import { useRecoilValue } from 'recoil';
import { allGamesDataState } from '@/components/state/allGamesState';

const useGameSearch = (): GameSearchProps => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const allGames = useRecoilValue(allGamesDataState);

  const handleSearch = (query: string) => {
    if (allGames) {
      const searchQueryLower = query.trim().toLowerCase();
      const filteredCategoryGamesSearch = allGames?.gameMains?.filter((gameMain: Game) =>
        gameMain.name.toLowerCase().includes(searchQueryLower)
      );

      setFilteredGames(filteredCategoryGamesSearch);
    } else {
      setFilteredGames([]);
    }
  };

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredGames,
    onSearchInputChange
  };
};

export default useGameSearch;

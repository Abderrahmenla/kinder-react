import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openSearchModalState } from '@/components/state/openSearchModalState';
import { ModalContentResult } from '@/components/Molecules/Casino/SearchInput/SearchInput.style';
import { SelectedGame } from '@/pages/api/casino/casinoTypes';
import { authState } from '@/components/state/isAuthenticated';
import { SearchModalResult } from './SearchModalResult';
import { useSearchModal } from '@/hooks/useSearchModal';
import { Dialog } from '@/components/Atoms/Dialog/Dialog';
import { SearchInput } from './SearchInput';
import {
  DialogSearchContentResultContainer,
  DialogSearchHeaderContainer,
  SearchResultText
} from './GlobalSearchStyles';
import { SearchGameModal } from './SearchGameModal';
import { mobileModalState } from '@/components/state/mobileModalState';

type GlobalSearchType = {
  isMobile?: boolean;
  standalone?: boolean;
};

export const GlobalSearch = ({ isMobile }: GlobalSearchType) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [mobileModal, setMobileModal] = useRecoilState(mobileModalState);
  const [openSearchModal, setOpenSearchModal] = useRecoilState(openSearchModalState);
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null);
  const handleCloseModal = useCallback(
    () => setOpenSearchModal({ open: false }),
    [setOpenSearchModal]
  );
  const {
    toggleFavorite,
    handleGameSwitch,
    handleSearch,
    isLoading,
    searchQuery,
    setSearchQuery,
    isFavorite,
    filteredGames
  } = useSearchModal({ isMobile });
  useEffect(() => {
    if (mobileModal) {
      setMobileModal(false);
    }
  }, []);
  const DialogSearchHeader = () => {
    return (
      <DialogSearchHeaderContainer type="Heading" size="h4">
        Search
      </DialogSearchHeaderContainer>
    );
  };

  const DialogSearchBody = () => {
    return (
      <>
        <SearchInput
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {!isLoading && filteredGames?.length > 0 && (
          <DialogSearchContentResultContainer>
            <SearchResultText>Search Results</SearchResultText>
            <SearchGameModal
              handleGameSwitch={handleGameSwitch}
              isAuthenticated={isAuthenticated}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              isMobile={isMobile}
              selectedGame={selectedGame}
            />
            <ModalContentResult>
              {filteredGames.map((game, index) => (
                <SearchModalResult
                  key={game.id}
                  index={index}
                  game={game}
                  handleGameSwitch={handleGameSwitch}
                  isAuthenticated={isAuthenticated}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                  setSelectedGame={setSelectedGame}
                />
              ))}
            </ModalContentResult>
          </DialogSearchContentResultContainer>
        )}
      </>
    );
  };

  return (
    <Dialog
      bodyContent={() => <DialogSearchBody />}
      headerContent={() => <DialogSearchHeader />}
      headerDivider
      maxWidth={1200}
      onClose={handleCloseModal}
      dialogHeaderStyle={{ padding: '14px 24px' }}
      dialogBodyStyle={{ padding: '24px' }}
      open={openSearchModal.open}
    />
  );
};

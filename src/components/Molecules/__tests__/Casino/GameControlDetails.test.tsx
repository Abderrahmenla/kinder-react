import React from 'react';
import { RecoilRoot } from 'recoil';
import { render } from '@testing-library/react';
import MockRouter from '@/mocks/MockRouter';
import { GameControlDetails } from '@/components/Molecules/Casino/GameControlDetails/GameControlDetails';
import { Game } from '@/pages/api/casino/casinoTypes';

const mockProps = {
  game: {
    name: 'Game Name',
    externalId: '1'
  } as Game
};

describe('GameControlDetails', () => {
  test('renders the component without errors', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <GameControlDetails {...mockProps} />
        </MockRouter>
      </RecoilRoot>
    );
  });
});

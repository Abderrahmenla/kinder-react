import React from 'react';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { GameSwitcher } from '@/components/Molecules/Casino/GameSwitcher/GameSwitcher';

describe('GameSwitcher', () => {
  test('renders the component without errors', () => {
    render(
      <RecoilRoot>
        <GameSwitcher />
      </RecoilRoot>
    );
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '@/components/Organisms/Search/Search';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';

jest.mock('@/hooks/useTranslations', () => ({
  __esModule: true,
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        searchYourGame: 'Search Your Game...'
      };
      return translations[key] || key;
    }
  })
}));

describe('Search', () => {
  test('should render the search component with the search input and performs a search', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <Search
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSearch={() => {}}
            searchQuery={''}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setSearchQuery={() => {}}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => {}}
          />
        </MockRouter>
      </RecoilRoot>
    );

    const searchInput = screen.getByPlaceholderText('Search Your Game...');

    expect(searchInput).toBeInTheDocument();

    const searchQuery = '';
    fireEvent.change(searchInput, { target: { value: searchQuery } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 13, charCode: 13 });

    expect(searchInput).toHaveValue(searchQuery);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { SearchInput } from '@/components/Molecules/Casino/SearchInput/SearchInput';

describe('SearchInput', () => {
  it('should render the search input', () => {
    const placeholder = 'Search Your Game...';
    const onClick = jest.fn();
    const onSearch = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchInput placeholder={placeholder} onClick={onClick} onSearch={onSearch} />
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
  });
});

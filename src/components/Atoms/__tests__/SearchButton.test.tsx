import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchButton } from '@/components/Atoms/SearchButton';
import { assets } from '@/config/assets';
describe('SearchButton', () => {
  test('renders the search button', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<SearchButton onClick={() => {}} />);

    const button = screen.getByRole('button', {});

    expect(button).toBeInTheDocument();
  });

  test('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(<SearchButton onClick={onClickMock} />);

    const button = screen.getByRole('button', {});
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  test('renders the search icon image', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<SearchButton onClick={() => {}} />);

    const image = screen.getByAltText('search', { exact: false });

    expect(image).toBeInTheDocument();
  });

  test('renders the search icon with the correct attributes', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<SearchButton onClick={() => {}} />);

    const image = screen.getByAltText('search', { exact: false });

    expect(image).toHaveAttribute('src', `${assets}/images/search.svg`);
    expect(image).toHaveAttribute('width', '20');
    expect(image).toHaveAttribute('height', '20');
  });
});

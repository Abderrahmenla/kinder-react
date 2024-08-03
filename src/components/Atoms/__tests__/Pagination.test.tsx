import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../Pagination/Pagination';

describe('Table Compoennt', () => {
  it('should render a pagination with 3 page numbers', () => {
    render(<Pagination pages={3} onClick={() => null} />);

    for (let x = 1; x <= 3; x++) {
      expect(screen.getByText(`${x}`)).toBeInTheDocument();
    }
  });

  it('should render a pagination with number 2, 3, and 4 id pages is equal to 5 and 3 is clicked', () => {
    render(<Pagination pages={5} onClick={() => null} />);

    const pageElement = screen.getByText('3');
    fireEvent.click(pageElement);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('should render a pagination with number  3, 4, and 5 id pages is equal to 5 and 4 is clicked', () => {
    render(<Pagination pages={5} onClick={() => null} />);

    let pageElement = screen.getByText('3');
    fireEvent.click(pageElement);

    pageElement = screen.getByText('4');
    fireEvent.click(pageElement);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});

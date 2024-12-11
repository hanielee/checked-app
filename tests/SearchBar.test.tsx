import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '..//app/components/navigation-bar/SearchBar';  

describe('SearchBar Component', () => {
  it('should render the search icon', () => {
    render(<SearchBar />);
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('should display the text inside the search bar', () => {
    render(<SearchBar />);
    const textElement = screen.getByText('text');
    expect(textElement).toBeInTheDocument();
  });

  it('should apply correct styles for hover effect', () => {
    render(<SearchBar />);
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toHaveClass('hover:bg-opacity-40');
  });
});

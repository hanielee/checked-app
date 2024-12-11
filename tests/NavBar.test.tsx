import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from '..//app/components/navigation-bar/NavBar';  
import { act } from 'react-dom/test-utils';

describe('NavBar Component', () => {
  it('should render the NavBar and contain the app name', () => {
    render(<NavBar />);
    screen.debug();

    expect(screen.getByText('Checked ✓')).toBeInTheDocument();
  });               

  it('should render the browse icons', () => {
    render(<NavBar />);
    const browseIcon1 = screen.getByTestId('browse-icon1');
    expect(browseIcon1).toBeInTheDocument();

    const browseIcon2 = screen.getByTestId('browse-icon2');
    expect(browseIcon2).toBeInTheDocument();
  });

  it('should render the close icon when the menu is open', () => {
    render(<NavBar />);
    const menuIcon = screen.getByTestId('menu-icon');
    
    act(() => {
      fireEvent.click(menuIcon);
    });

    const closeIcon = screen.getByTestId('close-icon');
    expect(closeIcon).toBeInTheDocument();
  });
});
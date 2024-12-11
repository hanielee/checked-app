import { render, screen } from '@testing-library/react';
import Categories, { categories } from '..//app/components/Categories';  
import '@testing-library/jest-dom'


jest.mock('..//app/components/CategoryCard', () => ({
    __esModule: true,
    default: ({ label, icon: Icon }: any) => (
      <div data-testid={`category-card-${label}`}>
        <Icon size={30} />
        <span>{label}</span>
      </div>
    ),
  }));
  
  describe('Categories Component', () => {
    it('should render all category cards correctly', () => {
      render(<Categories />);
  
      categories.forEach((category) => {
        const categoryElement = screen.getByTestId(`category-card-${category.label}`);
        expect(categoryElement).toBeInTheDocument();
        expect(categoryElement).toHaveTextContent(category.label);
      });
    });
  
    it('should display icons for each category card', () => {
      render(<Categories />);
  
      categories.forEach((category) => {
        const categoryIcon = screen.getByTestId(`category-card-${category.label}`).querySelector('svg');
        expect(categoryIcon).toBeInTheDocument();
      });
    });
  
    it('should match the snapshot', () => {
      const { asFragment } = render(<Categories />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
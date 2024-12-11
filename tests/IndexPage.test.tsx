import { render, screen, fireEvent } from '@testing-library/react';
import IndexPage from '..//app/components/list-view/IndexPage';
import { Item } from '..//app/components/list-view/ListItem';
import '@testing-library/jest-dom'

const sampleData: Item[] = [
    { _id: '1', Name: 'Item 1', Category: 'Category 1', Address: 'Address 1', Tags: 'Tag1', 'Avg Price per Person': '20', Price: '100', Photos: 'photo1.jpg', Website: 'website1.com', Socials: 'social1.com', Phone: '123', location: { type: 'Point', coordinates: [1, 1] } },
    { _id: '2', Name: 'Item 2', Category: 'Category 2', Address: 'Address 2', Tags: 'Tag2', 'Avg Price per Person': '25', Price: '120', Photos: 'photo2.jpg', Website: 'website2.com', Socials: 'social2.com', Phone: '124', location: { type: 'Point', coordinates: [2, 2] } },
    { _id: '3', Name: 'Item 3', Category: 'Category 3', Address: 'Address 3', Tags: 'Tag3', 'Avg Price per Person': '30', Price: '150', Photos: 'photo3.jpg', Website: 'website3.com', Socials: 'social3.com', Phone: '125', location: { type: 'Point', coordinates: [3, 3] } },
    { _id: '4', Name: 'Item 4', Category: 'Category 4', Address: 'Address 4', Tags: 'Tag4', 'Avg Price per Person': '35', Price: '180', Photos: 'photo4.jpg', Website: 'website4.com', Socials: 'social4.com', Phone: '126', location: { type: 'Point', coordinates: [4, 4] } },
    { _id: '5', Name: 'Item 5', Category: 'Category 5', Address: 'Address 5', Tags: 'Tag5', 'Avg Price per Person': '40', Price: '200', Photos: 'photo5.jpg', Website: 'website5.com', Socials: 'social5.com', Phone: '127', location: { type: 'Point', coordinates: [5, 5] } },
    { _id: '6', Name: 'Item 6', Category: 'Category 6', Address: 'Address 6', Tags: 'Tag6', 'Avg Price per Person': '45', Price: '220', Photos: 'photo6.jpg', Website: 'website6.com', Socials: 'social6.com', Phone: '128', location: { type: 'Point', coordinates: [6, 6] } },
    { _id: '7', Name: 'Item 7', Category: 'Category 7', Address: 'Address 7', Tags: 'Tag7', 'Avg Price per Person': '50', Price: '250', Photos: 'photo7.jpg', Website: 'website7.com', Socials: 'social7.com', Phone: '129', location: { type: 'Point', coordinates: [7, 7] } },
    { _id: '8', Name: 'Item 8', Category: 'Category 8', Address: 'Address 8', Tags: 'Tag8', 'Avg Price per Person': '55', Price: '270', Photos: 'photo8.jpg', Website: 'website8.com', Socials: 'social8.com', Phone: '130', location: { type: 'Point', coordinates: [8, 8] } },
    { _id: '9', Name: 'Item 9', Category: 'Category 9', Address: 'Address 9', Tags: 'Tag9', 'Avg Price per Person': '60', Price: '300', Photos: 'photo9.jpg', Website: 'website9.com', Socials: 'social9.com', Phone: '131', location: { type: 'Point', coordinates: [9, 9] } },
    { _id: '10', Name: 'Item 10', Category: 'Category 10', Address: 'Address 10', Tags: 'Tag10', 'Avg Price per Person': '65', Price: '320', Photos: 'photo10.jpg', Website: 'website10.com', Socials: 'social10.com', Phone: '132', location: { type: 'Point', coordinates: [10, 10] } },
    { _id: '11', Name: 'Item 11', Category: 'Category 11', Address: 'Address 11', Tags: 'Tag11', 'Avg Price per Person': '70', Price: '350', Photos: 'photo11.jpg', Website: 'website11.com', Socials: 'social11.com', Phone: '133', location: { type: 'Point', coordinates: [11, 11] } },
    { _id: '12', Name: 'Item 12', Category: 'Category 12', Address: 'Address 12', Tags: 'Tag12', 'Avg Price per Person': '75', Price: '380', Photos: 'photo12.jpg', Website: 'website12.com', Socials: 'social12.com', Phone: '134', location: { type: 'Point', coordinates: [12, 12] } },
    { _id: '13', Name: 'Item 13', Category: 'Category 13', Address: 'Address 13', Tags: 'Tag13', 'Avg Price per Person': '80', Price: '400', Photos: 'photo13.jpg', Website: 'website13.com', Socials: 'social13.com', Phone: '135', location: { type: 'Point', coordinates: [13, 13] } }];

describe('IndexPage Component', () => {
  const itemsPerPage = 2;

  it('should render the correct items based on pagination', () => {
    render(<IndexPage initialData={sampleData} itemsPerPage={itemsPerPage} />);
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should navigate to the next page when the "next" button is clicked', () => {
    render(<IndexPage initialData={sampleData} itemsPerPage={itemsPerPage} />);
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('2'));
    
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  it('should go to a specific page when input is provided', () => {
    render(<IndexPage initialData={sampleData} itemsPerPage={itemsPerPage} />);
    
    fireEvent.change(screen.getByPlaceholderText('Go to page'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Go'));
    
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  
  it('should not go to invalid page when the input is out of range', () => {
    render(<IndexPage initialData={sampleData} itemsPerPage={itemsPerPage} />);
    
    fireEvent.change(screen.getByPlaceholderText('Go to page'), { target: { value: '-1' } });
    fireEvent.click(screen.getByText('Go'));
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});

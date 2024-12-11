import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import "./list.css"

interface Item {
  _id: string;
  Name: string;
  Category: string;
  Address: string;
  Tags: string;
  "Avg Price per Person": string;
  Price: string;
  Photos: string;
  Website: string;
  Socials: string;
  Phone: string | number;
  location: {
    type: string;
    coordinates: [number, number];
  };
}


interface IndexPageProps {
  initialData: Item[];
  itemsPerPage: number;
}

const IndexPage: React.FC<IndexPageProps> = ({ itemsPerPage, initialData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState('');

  useEffect(() => {
    // Calculate the total number of pages based on the number of items per page
    const totalPagesCount = Math.ceil(initialData.length / itemsPerPage);
    setTotalPages(totalPagesCount);

    // Adjust the current page if it exceeds the total pages after the itemsPerPage change
    if (currentPage > totalPagesCount) {
      setCurrentPage(totalPagesCount);
    }
  }, [initialData, itemsPerPage, currentPage]);

  const handleClickPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setInputPage(''); // Clear the input field after navigation
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setInputPage(''); // Clear the input field after navigation
    }
  };

  // Calculate the index of the first and last items to display based on the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Get the items to display on the current page
  const itemsToShow = initialData.slice(firstIndex, lastIndex);

  // Determine the range of buttons to display
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > 9) {
    if (currentPage <= 5) {
      endPage = 9;
    } else if (currentPage >= totalPages - 4) {
      startPage = totalPages - 8;
    } else {
      startPage = currentPage - 4;
      endPage = currentPage + 4;
    }
  }

  return (
    <div className="list-container">
      <ul className="bg-white shadow-sm overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16 w-full sm:max-w-none">
        {itemsToShow.map((item: Item) => (
          <ListItem key={item._id} item={item} />
        ))}
      </ul>
      <div className="fixed-container2">
        {startPage > 1 && (
          <button
            className="pagination-button"
            onClick={() => handleClickPage(1)}
          >
            1
          </button>
        )}
        {startPage > 2 && (
          <span className="pagination-dots">...</span>
        )}
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={index}
              className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => handleClickPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        {endPage < totalPages - 1 && (
          <span className="pagination-dots">...</span>
        )}
        {endPage < totalPages && (
          <button
            className="pagination-button"
            onClick={() => handleClickPage(totalPages)}
          >
            {totalPages}
          </button>
        )}
      </div>
      <div className="input-container">
        <input
          type="number"
          className="input-page-number"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          placeholder="Go to page"
        />
        <button
          className="go-button"
          onClick={handleGoToPage}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default IndexPage;

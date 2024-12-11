'use client';
import {} from "./components/Categories";
// import Container from "./components/Container"
// import SearchBar from "./components/SearchBar"
import Categories from "./components/Categories";
import IndexPage from "./components/list-view/IndexPage";

import { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [initialData, setInitialData] = useState([]);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      const search = ""; // Set your search criteria here
      const url = search ? `http://localhost:3001/fetchAll?category=${search}` : `http://localhost:3001/fetchAll`;

      console.log(url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setInitialData(data);
        console.log("Initial Data:");
        console.log(data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div className="flex flex-row mt-10 bg-white">
        <div className="mt-8 flex-1">
          {activeTab === 'tab1' && (
            <div>
              <Categories />
            </div>
          )}
          {activeTab === 'tab2' && (
            <div>
              <IndexPage initialData={initialData} itemsPerPage={ITEMS_PER_PAGE} />
            </div>
          )}
        </div>

        <nav className="w-full bg-white p-4 fixed bottom-0 left-0 flex justify-center">
          <button
            className={`mx-2 items-center px-4 py-2 rounded ${
              activeTab === 'tab1' ? 'text-custom-500' : 'text-gray-400'
            }`}
            onClick={() => handleTabClick('tab1')}
          >
            <span>Categories</span>
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded ${
              activeTab === 'tab2' ? 'text-custom-500' : 'text-gray-400'
            }`}
            onClick={() => handleTabClick('tab2')}
          >
            <span>List</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

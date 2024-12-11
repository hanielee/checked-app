'use client';
import { CgSearch } from "react-icons/cg";

const SearchBar = () => {
    return (
        <div className="bg-gray-100 bg-opacity-30 w-full md:w-auto py-3 p-4 rounded-xl hover:bg-opacity-40 transition cursor-pointer" data-testid="search-bar">
          <div className="flex flex-row items-center">
            <CgSearch size={15} color="white" className="opacity-100" data-testid="search-icon"/>
            <div className="text-white text-sm px-6 opacity-100">
              text
            </div>
          </div>
        </div>
      );
      
}
 
export default SearchBar;
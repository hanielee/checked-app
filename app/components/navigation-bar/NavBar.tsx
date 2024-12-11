'use client';
import Container from "../Container";
import SearchBar from "./SearchBar";
import Categories from "../Categories";
import IndexPage from "../list-view/IndexPage";
import Link from "next/link";
import { BiMap, BiMenu, BiRightTopArrowCircle } from "react-icons/bi";
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai"

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-custom-500">
      <div className="container flex justify-between items-center py-5 px-4 2xl:px-16 mx-auto">
        <div onClick={handleNav} className="md:hidden" data-testid="menu-icon">
          <BiMenu size={25} className="text-white"/>
        </div>
        <div className="text-white font-bold text-xl px-6 opacity-100">
          <Link href="/">Checked ✓</Link>
        </div>
        <div className="hidden sm:flex flex flex-row space-x-10 text-white font-bold">
          <Link href="/maps" className="flex items-center">
            <BiMap size={20} className="mr-2" />
            <span>Around Me</span>
          </Link>
          <Link href="/browse" className="flex items-center">
            <BiRightTopArrowCircle size={20} className="mr-2" data-testid="browse-icon1"/>
            <span>Browse</span>
          </Link>
        </div>
        <div className="hidden sm:flex w-10 h-10 rounded-full bg-white"></div>

        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-white p-10 ease-in duration-500 transition-transform transform translate-x-0 sm:-translate-x-screen"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div onClick={handleNav} className="md:hidden cursor-pointer" data-testid="close-icon">
            <AiOutlineClose size={25} className="text-black" />
          </div>

          <div className="flex flex-col justify-between py-4 text-white">
            <Link href="/maps">
              <div
                onClick={() => setMenuOpen(false)}
                className="py-4 flex items-center"
              >
                <BiMap size={20} className="mr-2" />
                <span>Around Me</span>
              </div>
            </Link>
            <Link href="/browse">
              <div
                onClick={() => setMenuOpen(false)}
                className="py-4 flex items-center"
              >
                <BiRightTopArrowCircle size={20} className="mr-2" data-testid="browse-icon2"/>
                <span>Browse</span>
              </div>
            </Link>
          </div>
          <div className="w-10 h-10 rounded-full bg-white"></div>
        </div>
      </div>
    </nav>
  );
};

      {/* <div className="flex flex-row mt-10 bg-white">
       <div className="mt-8">
        {activeTab === 'tab1' && (
          <div>
<Categories />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
          
          <IndexPage />
          </div>
        )}
      </div>
        
      <nav className="w-full bg-white p-4 md:hidden fixed bottom-0 left-0 flex justify-center">
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
      </div> */}
 
export default NavBar;
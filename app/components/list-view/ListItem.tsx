import React, { useState } from 'react';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ItemDetails from './ItemDetails';
import ReactDOM from 'react-dom';

interface ListItemProps {
    key: string;
    item: Item;
}

export interface Item {
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

const ListItem: React.FC<ListItemProps> = ({ item }) => {

  const [showModal, setShowModal] = useState(false);

  const handleClick2 = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const handleClick2 = () => {
  //   const newWindow = window.open('', '_blank');
  //   newWindow?.document.write('<div id="itemDetailsContainer"></div>');
  //   const element: any = <ItemDetails item={item} onClose={handleCloseModal}/>
  //   const doc: any = newWindow?.document.getElementById('itemDetailsContainer')
  //   ReactDOM.render(element, doc);
  // };

  
    return (
      <div>
        <li className="border-t border-gray-200 flex items-center transition duration-300 hover:bg-gray-100 w-full" onClick={handleClick2}>
          <div className="px-4 py-5 sm:px-6 flex items-center">
          <div className="w-16 h-16 mr-4 overflow-hidden rounded">
          <img
            src={item.Photos}
            alt={item.Name}
            className="object-cover w-full h-full"
          /></div>
            <div className="flex flex-col">
              <p className="text-sm leading-6 font-medium text-gray-900">
                <span className="font-bold">{item.Name}</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{item.Category}</p>
            </div>
          </div>
          <div className="flex-grow"></div>
          <div className="px-4">
            <MdOutlineArrowForwardIos />
          </div>
        </li>
        {showModal && <ItemDetails item={item} onClose={handleCloseModal} />}
        </div>
      );
    };
    
    
export default ListItem;

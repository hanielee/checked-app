// ItemDetails.tsx
import React from 'react';
import { Item } from './ListItem';
import { MdClose } from "react-icons/md";
import "./list.css"

interface ItemDetailsProps {
  item: Item;
  onClose: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onClose }) => {
    return (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{item.Name}</h2>
              <button onClick={onClose}>
                <MdClose />
              </button>
            </div>
            <div className="modal-content">
                <p><b>Name:</b> {item.Name} </p>
              <p><b>Category:</b> {item.Category}</p>
              <p><b>Address:</b> {item.Address}</p>
              <p><b>Avg Price per Person:</b> {item['Avg Price per Person']}</p>
              <p><b>Price:</b> {item.Price}</p>
              <img src={item.Photos} alt={item.Name} />
              <p>
              <b>Website:{' '}</b>
                <a href={item.Website} target="_blank" rel="noopener noreferrer">
                  {item.Website}
                </a>
              </p>
              <p>
                <b>Socials:{' '}</b>
                <a href={item.Socials} target="_blank" rel="noopener noreferrer">
                  {item.Socials}
                </a>
              </p>
              <p><b>Phone:</b> {item.Phone}</p>
              <p><b>Location:</b> {JSON.stringify(item.location)}</p>
              <p><b>Tags:</b> {item.Tags}</p>
            </div>
          </div>
        </div>
      );
    };

export default ItemDetails;

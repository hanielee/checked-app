'use client';
import React, { useState, useEffect } from 'react';
import "../Maps.css";
import { useRouter, useSearchParams } from "next/navigation";

import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

export default function Maps() {

  const searchParams = useSearchParams();
 
  const search = searchParams.get('category');
  //console.log(search);

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [center, setCenter] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const categoryMarkerColors = {
    Bar: 'blue',
    Restaurant: 'red',
    Yoga: 'yellow',
    Island: 'blue',
    'Co-Working Space': 'orange',
    Mall: 'pink',
    Activity: 'green',
    Spa: 'lightblue',
    Hike: 'darkgreen',
    Hotel: 'lightbrown',
  };


  const [locations, setLocations] = useState([]);

  const string = search ? `http://localhost:3001/fetchAll?category=${search}`: `http://localhost:3001/fetchAll`;
  useEffect(() => {
    fetch(string)
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching location data:', error))
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCenter({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting current location:', error);
            setCenter(defaultCenter);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setCenter(defaultCenter);
      }
  }, []);
  console.log(locations);


  const getPlaceDetails = (location) => {
    const geocoder = new google.maps.Geocoder();
    const { coordinates } = location.location;
  
    const latLng = {
      lat: parseFloat(coordinates[1]),
      lng: parseFloat(coordinates[0]),
    };
  
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const placeId = results[0].place_id;
          const request = {
            placeId: placeId,
            fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'rating', 'photos', 'reviews'],
          };
  
          const service = new google.maps.places.PlacesService(document.createElement('div'));
          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              setSelectedLocation((prevLocation) => ({ ...prevLocation, placeDetails: place }));
            } else {
              console.error('Place details request failed:', status);
            }
          });
        } else {
          console.error('No results found.');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };


  const handleMarkerClick = (location, index) => {
    setSelectedLocation(location);
    getPlaceDetails(location);
    setSelectedMarkerIndex(index);
  };

  const handleGeolocation = () => {
    const defaultCenter = {
      lat: 3.1441858, // Default center latitude
      lng: 100, // Default center longitude
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setCenter(defaultCenter);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedLocation(null);
    setSelectedMarkerIndex(null);
  };

  return (
    <div className="fixed w-full h-20 bg-custom-500 z-10">
      <div>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocomplete.setFields(['formatted_address']);
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              setOrigin(place.formatted_address);
            });
          }}
        >
          <input
            type="text"
            placeholder="From"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </Autocomplete>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocomplete.setFields(['formatted_address']);
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              setDestination(place.formatted_address);
            });
          }}
        >
          <input
            type="text"
            placeholder="To"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Autocomplete>
      </div>
      <button onClick={handleGeolocation}>Use Current Location</button>
      {response && (
        <div className="row">
          <p className="info">Distance: {response.routes[0].legs[0].distance.text}</p>
          <p className="info">Duration: {response.routes[0].legs[0].duration.text}</p>
        </div>
      )}
      <div className="container">
    {showPopup && (
        <div className="popup">
          <button className="close-button" onClick={closePopup}>
            X
          </button>
          {selectedLocation && (
            <div className="place-details">
              <h3>Place Information</h3>
              <p><b>Name:</b> {selectedLocation.name}</p>
              <p><b>Category:</b> {selectedLocation.Category}</p>
              <p><b>Address:</b> {selectedLocation.formatted_address}</p>
              <p><b>Phone:</b> {selectedLocation.formatted_phone_number}</p>
              <p><b>Website:</b> {selectedLocation.website}</p>
              <p><b>Rating:</b> {selectedLocation.rating}</p>
              <p>Photos: {selectedLocation.photos && (
                selectedLocation.photos.map((photo, index) => (
                  <img key={index} src={photo.getUrl()} alt={`Photo ${index + 1}`} width="100" height="100" />
                ))
              )}</p>
              <h4>Reviews:</h4>
              {selectedLocation.reviews ? (
                selectedLocation.reviews.map((review, index) => (
                  <div key={index}>
                    <p><b>Author:</b> {review.author_name}</p>
                    <p><b>Rating:</b> {review.rating}</p>
                    <p><b>Text:</b> {review.text}</p>
                    <p><b>Time:</b> {review.relative_time_description}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          )}
        </div>
        )}
      <GoogleMap mapContainerClassName="map-container" center={center} zoom={10}>
        {locations.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(place?.location?.coordinates?.[1] || 0),
              lng: parseFloat(place?.location?.coordinates?.[0] || 0)
            }}
            
            icon={{
              url: selectedMarkerIndex == index ? "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png" : `https://maps.google.com/mapfiles/ms/icons/${categoryMarkerColors[place.Category] || 'red'}-dot.png`,
            }}
            onClick={() => handleMarkerClick({...place, location: { coordinates: [place.location.coordinates[0], place.location.coordinates[1]] }}, index)}
          >
            <div className="sidebar">
            {selectedMarkerIndex == index && selectedLocation && (
              
        <div className={`popup${showPopup ? ' active' : ''}`}>
          <button className="close-button" onClick={closePopup}>
            X
          </button>
          <div className="place-details content-container">
            <h3>Place Information</h3>
            <p><b>Name:</b> {selectedLocation.Name}</p>
            <p><b>Category:</b> {selectedLocation.Category}</p>
            <p><b>Address:</b> {selectedLocation.Address}</p>
            <p><b>Phone:</b> {selectedLocation.Phone}</p>
            <p><b>Video:</b> {selectedLocation.Video}</p>
            <p>Photo: {selectedLocation.Photos && (
              <img src={selectedLocation.Photos} alt="Place Photo" width="100" height="100" />
            )}</p>
            <p><b>Tags:</b> {selectedLocation.Tags}</p>
            <p><b>Latitude:</b> {selectedLocation.location.coordinates[1]}</p>
            <p><b>Longitude:</b> {selectedLocation.location.coordinates[0]}</p>
            <a
              href={`https://maps.google.com/?q=${selectedLocation.location.coordinates[1]},${selectedLocation.location.coordinates[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline' }}
            >
              View on Google Maps
            </a>
            {/* <button className="show-more-button" onClick={openPopup}>
              Show More Information
            </button> */}
            <h4>Reviews:</h4>
            {selectedLocation.placeDetails && selectedLocation.placeDetails.reviews ? (
              selectedLocation.placeDetails.reviews.map((review, index) => (
                <div key={index}>
                  <p><b>Author:</b> {review.author_name}</p>
                  <p><b>Rating:</b> {review.rating}</p>
                  <p><b>Text:</b> {review.text}</p>
                  <p><b>Time:</b> {review.relative_time_description}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </div>
      )}
          </div>
          </Marker>
        ))}
      </GoogleMap>
    </div>
    </div>
  );
}



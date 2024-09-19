import React, { useEffect, useState } from 'react';

const GeolocationComponent = ({address, onLocationFetched}) => {
  const [city, setCity] = useState('');

  useEffect(() => {
    if (address) {
      getCoordinates(); // Get coordinates based on manually entered address
    } else {
      getCurrentLocation(); // Get coordinates based on current location
    }
  }, [address]);


 //functie care se apeleaza la inceput daca nu este adresa ===>
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`Coordinates found: Latitude: ${lat}, Longitude: ${lng}`);
          await getCityFromCoordinates(lat, lng);
          onLocationFetched(lat, lng);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // functie care returneaza orasul si tara in care te afli===>
  const getCityFromCoordinates = async (latitude, longitude) => {
    const accessToken = 'pk.eyJ1IjoiY29zbWFrLTQ3IiwiYSI6ImNtMHhoczZsejA3ZjgyanF6YWpzMDV4cDAifQ.LiwxPafEUZs60SWhAMCpdg';
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

    try {
      const response = await fetch(`${baseUrl}${longitude},${latitude}.json?access_token=${accessToken}&types=place`);
      const data = await response.json();
      if (data.features.length > 0) {
        const placeInfo = data.features[0].place_name;
        console.log(`Location found: ${placeInfo}`);
        setCity(placeInfo);
        onLocationFetched(latitude, longitude);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  //functie care face toata logica la partea cu gasitul locatiei
  const getCoordinates = async () => {
    const accessToken = 'pk.eyJ1IjoiY29zbWFrLTQ3IiwiYSI6ImNtMHhoczZsejA3ZjgyanF6YWpzMDV4cDAifQ.LiwxPafEUZs60SWhAMCpdg';
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    let searchAddress = address;

    // Check if city or country is already part of the address
    if (city && !address.toLowerCase().includes(city.toLowerCase())) {
      searchAddress += `, ${city}`;
    }

    console.log(`Final address to search: ${searchAddress}`);

    try {
      const response = await fetch(`${baseUrl}${encodeURIComponent(searchAddress)}.json?access_token=${accessToken}`);
      const data = await response.json();
      if (data.features.length > 0) {
        const coords = data.features[0].geometry.coordinates;
        console.log(`Coordinates found: Latitude: ${coords[1]}, Longitude: ${coords[0]}`);
        onLocationFetched(coords[1], coords[0]);
      } else {
        console.error('No coordinates found for this address');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return null; // This component does not render anything
};

export default GeolocationComponent;

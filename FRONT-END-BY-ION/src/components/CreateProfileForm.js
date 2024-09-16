import React, { useState, useEffect } from 'react';
import ImageUpload from './DragAndDrop';
import "../styles/LogInPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import myString from './DefaultImage';

const PetForm = () => {

  const [imageSrc, setImageSrc] = useState(myString);
  const [error, setError] = useState('');
  const [coordinates, setCoordinates] = useState(null); // State to store fetched coordinates
  const [currentCountry, setCurrentCountry] = useState(''); 
  const [latitude, setLatitude] = useState(null); // State to store latitude
  const [longitude, setLongitude] = useState(null); // State to store longitude

  const [formData, setFormData] = useState({
    petName: '',
    gender: '',
    breed: '',
    age: '',
    ownerName: '',
    ownerPhone: '',
    vaccinated: '',
    allergies: '',
    vetInfo: '',
    readyForBreeding: false,
    breedingPrice: '',
    address: '', // New field for pet's address
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (imageSrc) {
      console.log('Image received in parent component:', imageSrc);
    }
  }, [imageSrc]);

  useEffect(() => {
    getCurrentLocation(); // Get current location when component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedFormData = {
      ...formData,
      image: imageSrc,
      latitude,  // Include latitude separately
      longitude  // Include longitude separately
    };
  
    const user = localStorage.getItem('userId');
  
    console.log('Form data submitted:', updatedFormData, user);
  
    try {
      const response = await axios.post(`http://localhost:3002/pets?userId=${user}`, updatedFormData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        console.log('Pet profile created successfully!');
        navigate('/HomePage');
      } else {
        setError('Failed to create pet profile.');
      }
    } catch (error) {
      console.error('Error creating pet profile:', error);
      setError('Failed to create pet profile.');
    }
  };
  
  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`Current Location: Latitude: ${lat}, Longitude: ${lng}`);
          
          setLatitude(lat); // Set latitude state
          setLongitude(lng); // Set longitude state
          
          await getCurrentCountry(lat, lng);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please ensure location services are enabled.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by your browser.');
    }
  };
  

  // Function to get the current country using reverse geocoding
  const getCurrentCountry = async (latitude, longitude) => {
    const accessToken = 'pk.eyJ1IjoiY29zbWFrLTQ3IiwiYSI6ImNtMHhoczZsejA3ZjgyanF6YWpzMDV4cDAifQ.LiwxPafEUZs60SWhAMCpdg';
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    
    try {
      const response = await fetch(`${baseUrl}${longitude},${latitude}.json?access_token=${accessToken}&types=country`);
      if (!response.ok) {
        throw new Error(`Failed to fetch country: ${response.status} ${response.statusText}`);
      }


      const data = await response.json();
      if (data.features.length > 0) {
        const country = data.features[0].place_name;
        console.log(`Detected Country: ${country}`);
        setCurrentCountry(country);
      } else {
        throw new Error('No country found for the current location.');
      }
    } catch (error) {
      console.error('Error fetching country:', error);
    }
  };

  // Updated function to get coordinates from an address using Mapbox Geocoding API
  const getCoordinates = async () => {
    const accessToken = 'pk.eyJ1IjoiY29zbWFrLTQ3IiwiYSI6ImNtMHhoczZsejA3ZjgyanF6YWpzMDV4cDAifQ.LiwxPafEUZs60SWhAMCpdg'; // Your Mapbox access token
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    let address = formData.address;
  
    if (!address) {
      alert('Please enter an address.');
      return;
    }
  
    // Automatically add the current country if not present in the address
    if (currentCountry && !address.includes(currentCountry)) {
      address += `, ${currentCountry}`;
    }
  
    try {
      const response = await fetch(`${baseUrl}${encodeURIComponent(address)}.json?access_token=${accessToken}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch coordinates: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.features.length === 0) {
        throw new Error('No coordinates found for this address');
      }
  
      const coords = data.features[0].geometry.coordinates;
      setLatitude(coords[1]); // Set latitude state
      setLongitude(coords[0]); // Set longitude state
      
      console.log(`Coordinates: Latitude: ${coords[1]}, Longitude: ${coords[0]}`);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setError(`Error fetching coordinates: ${error.message}`);
    }
  };
  

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      {/* Existing form fields */}
      <p className="writingFromPetLogIn">Pet name</p>
      <div className="input_filed">
        <input
          type="text"
          name="petName"
          value={formData.petName}
          placeholder="ex: Bobby"
          onChange={handleChange}
          required
        />
      </div>

      {/* Gender Input */}
      <p className="writingFromPetLogIn">Gender</p>
      <div className="input_filed">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Tap to select
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <p className="writingFromPetLogIn">Breed</p>
      <div className="input_filed">
        <input
          type="text"
          name="breed"
          value={formData.breed}
          placeholder="ex: Brodiaga po jizni simpotiaga"
          onChange={handleChange}
          required
        />
      </div>

      <p className="writingFromPetLogIn">Age</p>
      <div className="input_filed">
        <input
          type="number"
          name="age"
          value={formData.age}
          placeholder="ex: 1 year and 6 months"
          onChange={handleChange}
          required
        />
      </div>

      <p className="writingFromPetLogIn">Owner name</p>
      <div className="input_filed">
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          placeholder="John"
          onChange={handleChange}
          required
        />
      </div>

      <p className="writingFromPetLogIn">Owner Phone Number</p>
      <div className="input_filed">
        <input
          type="text"
          name="ownerPhone"
          value={formData.ownerPhone}
          placeholder="ex: +373 079 000 000"
          onChange={handleChange}
          required
        />
      </div>


      <p className="writingFromPetLogIn">Vaccinated</p>
      <div className="input_filed">
        <select
          name="vaccinated"
          value={formData.vaccinated}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Tap to select
          </option>
          <option value="Yes, all">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <p className="writingFromPetLogIn">Allergies</p>
      <div className="input_filed">
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          placeholder="Ex: None"
          onChange={handleChange}
          required
        />
      </div>

      <p className="writingFromPetLogIn">Veterinarian information</p>
      <div className="input_filed">
        <input
          type="text"
          name="vetInfo"
          value={formData.vetInfo}
          placeholder="Ex: Name and Address"
          onChange={handleChange}
          required
        />
      </div>

      {/* Moved Address Field */}
      <p className="writingFromPetLogIn">Your Pet's Address</p>
      <div className="input_filed">
        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Enter your pet's address"
          onChange={handleChange}
          onBlur={getCoordinates} // Fetch coordinates when input loses focus
          required
        />
      </div>

      {/* "Ready for Breeding" Section */}
      <div id="ReadyForBeeding">
        <p>Ready for breeding?</p>
        <input
          type="checkbox"
          id="checkbox"
          name="readyForBreeding"
          checked={formData.readyForBreeding}
          onChange={handleChange}
        />
      </div>

      {formData.readyForBreeding && (
        <>
          <p className="writingFromPetLogIn">Breeding Price</p>
          <div className="input_filed">
            <input
              type="number"
              name="breedingPrice"
              value={formData.breedingPrice}
              placeholder="ex: 150"
              onChange={handleChange}
            />
          </div>
        </>
      )}


      <ImageUpload setImageSrc={setImageSrc} />

      <button type="submit" className="login" >
        Create Pet Profile
      </button>
    </form>
  );
};

export default PetForm;

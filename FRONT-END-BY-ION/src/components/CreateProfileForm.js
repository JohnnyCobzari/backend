import React, { useState, useEffect } from 'react';
import ImageUpload from './DragAndDrop';
import "../styles/LogInPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PetForm = () => {

  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState(''); // Stare pentru imaginea în format base64

  useEffect(() => {
    if (imageSrc) {
      console.log('Image received in parent component:', imageSrc); // Verificăm imaginea încărcată
    }
  }, [imageSrc]); // Se declanșează atunci când se schimbă `imageSrc`


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
    image: '' // Adăugăm aici imaginea în format base64
  });

  const navigate = useNavigate();

  const goToHomePage1 = () => {
    //navigate('/HomePage');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construct the updated form data
    const updatedFormData = {
      ...formData,
      image: imageSrc // Keep the image data
    };
  
    // Retrieve the userId from localStorage
    const user = localStorage.getItem('userId');
    
    // Log the form data to check if it's correctly structured
    console.log('Form data submitted:', updatedFormData, user);
    
    try {
      // Make the POST request to the server, sending userId as a query parameter
      const response = await axios.post(`http://localhost:3002/pets?userId=${user}`, updatedFormData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Use token from localStorage for authorization
          'Content-Type': 'application/json', // Set content type to JSON
        },
      });
  
      // Check the response status and handle success
      if (response.status === 201) {
        console.log('Pet profile created successfully!');
        navigate('/HomePage'); // Redirect to home page on success
      } else {
        setError('Failed to create pet profile.'); // Set error message if status is not 201
      }
    } catch (error) {
      // Log error and set error message if request fails
      console.error('Error creating pet profile:', error);
      setError('Failed to create pet profile.');
    }
  };
  
  
    
  
  return (
    <form id="login-form" onSubmit={handleSubmit}>
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

      <p className="writingFromPetLogIn">Veterinarian Information</p>
      <div className="input_filed">
        <input
          type="text"
          name="vetInfo"
          value={formData.vetInfo}
          placeholder="ex: Vet clinic, Veterinarian's name"
          onChange={handleChange}
          required
        />
      </div>

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
          <p className="writingFromPetLogIn">Price for breeding</p>
          <div className="input_filed">
            <input
              type="number"
              name="breedingPrice"
              value={formData.breedingPrice}
              placeholder="ex: 100$"
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      {error && <p className="error-message">{error}</p>} {/* Afișează mesajul de eroare */}

      <ImageUpload setImageSrc={setImageSrc} /> {/* Transmitem setImageSrc către componenta copil */}

      <button type="submit" className="login" onClick={goToHomePage1}>
        Create Pet Profile
      </button>
    </form>
  );
};

export default PetForm;
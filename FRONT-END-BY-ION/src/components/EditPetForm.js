import React, { useState, useEffect } from 'react';
import ImageUpload from './DragAndDrop';
import "../styles/LogInPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditPetForm = ({ petProfile, image, id }) => {
  const [imageSrc, setImageSrc] = useState(image); // Initialize with received image
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    petName: petProfile.petName,
    gender: petProfile.gender,
    breed: petProfile.breed,
    age: petProfile.age,
    ownerName: petProfile.ownerName,
    ownerPhone: petProfile.ownerPhone,
    vaccinated: petProfile.vaccinated,
    allergies: petProfile.allergies,
    vetInfo: petProfile.vetInfo,
    address:petProfile.address,
    readyForBreeding: petProfile.readyForBreeding,
    breedingPrice: petProfile.breedingPrice,
    image: image
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  console.log(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construct the updated form data
    const updatedFormData = {
      ...formData,
      image: imageSrc // Include updated image
    };
  
    try {
      // Make the PUT request to update the pet profile
      const response = await axios.put(`http://localhost:3002/pets/${id}`, updatedFormData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Use token from localStorage for authorization
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the update was successful
      if (response.status === 200) {
        console.log('Pet profile updated successfully!');
        navigate('/HomePage'); // Redirect to home page on success
      } else {
        setError('Failed to update pet profile.');
      }
    } catch (error) {
      // Log error and set error message if request fails
      console.error('Error updating pet profile:', error);
      setError('Failed to update pet profile.');
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
      {error && <p className="error-message">{error}</p>} {/* Show error message */}

      <ImageUpload setImageSrc={setImageSrc} imageSrc={imageSrc} /> {/* Pass image upload logic */}

      <button type="submit" className="login">
        Edit Profile
      </button>
    </form>
  );
};

export default EditPetForm;

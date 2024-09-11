import React, { useState } from 'react';
import ImageUpload from './DragAndDrop';
import "../styles/LogInPage.css";
import { useNavigate } from "react-router-dom";


const PetForm = () => {
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
  });

  const navigate = useNavigate();

  const goToHomePage1 = () =>{
      navigate('/HomePage');
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
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
          type="text"
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
          <option value="Yes, all">Yes, all</option>
          <option value="Yes, some">Yes, some</option>
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
              type="text"
              name="breedingPrice"
              value={formData.breedingPrice}
              placeholder="ex: 100$"
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <ImageUpload />

      <button type="submit" className="login" onClick={goToHomePage1}>
        Create Pet Profile
      </button>
    </form>
  );
};

export default PetForm;

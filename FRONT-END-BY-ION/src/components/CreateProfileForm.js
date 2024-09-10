// src/PetForm.js
import React, { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data submitted:', formData);
  };

  return (
    <form id="login-form2" onSubmit={handleSubmit}>
      <p className="writingFromPetLogIn">Pet name</p>
      <div className="input_filed2">
        <input
          type="text"
          name="petName"
          value={formData.petName}
          placeholder="ex:Bobby"
          onChange={handleChange}
          required
        />
      </div>

      <p className="writingFromPetLogIn">Gender</p>
      <div className="input_filed2">
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
      <div className="input_filed2">
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
      <div className="input_filed2">
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
      <div className="input_filed2">
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
      <div className="input_filed2">
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
      <div className="input_filed2">
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
      <div className="input_filed2">
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          placeholder="Ex: None"
          onChange={handleChange}
          required
        />
      </div>

      <p className="writingFromPetLogIn">Veterinar Information</p>
      <div className="input_filed2">
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
          <div className="input_filed2">
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

      <button type="submit" className="login2">
        Create
      </button>
    </form>
  );
};

export default PetForm;

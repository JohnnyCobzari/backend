import React, { useState } from "react";
import "../styles/VaccinationForm.css";
import { FaTrash } from "react-icons/fa";

function VaccinationForm({ setVaccines, vaccines }) {
  const [showVaccineFields, setShowVaccineFields] = useState(false);

  const handleVaccineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVaccines = [...vaccines];
    updatedVaccines[index][name] = value;
    setVaccines(updatedVaccines);
  };

  const addVaccineField = () => {
    setShowVaccineFields(true);
    setVaccines([...vaccines, { name: "", dateAdministered: "" }]); // Updated key names
  };

  const removeVaccineField = (index) => {
    const updatedVaccines = vaccines.filter((_, i) => i !== index);
    setVaccines(updatedVaccines);
    if (updatedVaccines.length === 0) {
      setShowVaccineFields(false);
    }
  };

  return (
    <div className="vaccination_form">
      <p className="writingFromPetLogIn">Vaccination Info:</p>

      {showVaccineFields &&
        vaccines.map((vaccine, index) => (
          <div key={index} className="vaccine_details">
            <div className="VaccinationInfoContainer">
              <div className="input_field_vaccines">
                <label htmlFor={`name-${index}`}>Vaccine Name</label>
                <input
                  type="text"
                  id={`name-${index}`}
                  name="name" // Updated key
                  value={vaccine.name} // Updated key
                  onChange={(e) => handleVaccineChange(index, e)}
                  required
                />
              </div>

              <div className="input_field_vaccines">
                <label htmlFor={`dateAdministered-${index}`}>
                    Next Administration Date
                </label>
                <input
                  type="date"
                  id={`dateAdministered-${index}`}
                  name="dateAdministered" // Updated key
                  value={vaccine.dateAdministered} // Updated key
                  onChange={(e) => handleVaccineChange(index, e)}
                  required
                  placeholder=""
                />
              </div>
            </div>
            <button type="button" onClick={() => removeVaccineField(index)}>
              <FaTrash />
            </button>
          </div>
        ))}

      <div className="VaccinationButton">
        <button type="button" onClick={addVaccineField}>
          Add Vaccination Info
        </button>
      </div>
    </div>
  );
}

export default VaccinationForm;

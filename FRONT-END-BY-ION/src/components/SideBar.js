import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import "../styles/SideBar.css" // Import the separate CSS file
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const goToCreateProfile = () =>{
      navigate('/AddPet')
  }

  const goToPetProfile = (id) => {
    navigate(`/ProfilePage/${id}`);
  };
  const handleLogout = () => {
    // Clear authToken and userId from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userPets');
    // Redirect to the homepage
    navigate('/');
  };


  // Array to store pet information (name and image link)
  //!!!!!!!!!!!!!! PENTRU ION ---> in asa gen de tabel doar ca cu toata info o sa trebuiasca sa primim de la back
  const pets = JSON.parse(localStorage.getItem('userPets') || '[]');


  //Pentru a inchide side barul cand apesi inafara lui
  //------> {nam cod inca}


  return (
    <div className={isOpen ? 'sidebar expanded' : 'sidebar'}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <div className="iconUserProfileContainer">
          <div className="ImageBoxSidebar">
            <FaRegUser />
          </div>
          <div className="textInSideBar">
            User Profile {/* aici se poate de pus numele la utilizator */}
          </div>
        </div>
      </button>

      <div className="sidebar-content">

        {/* Display each pet */}
        {pets.map((pet, index) => (
          <div className="iconUserProfileContainer" key={index}  onClick={() => goToPetProfile(pet._id)}>
            <div className="ImageBoxSidebar">
              {/* Replace icon with the pet's image */}
              <img src={pet.image} className="pet-image" />
            </div>
            <div className="textInSideBar">
              {pet.petName}
            </div>
          </div>
        ))}
      

        {/* Add Pet Button */}
        <div className="iconUserProfileContainer">
            <div className="BoxSidebarButton" onClick={goToCreateProfile}>
              +
            </div>
            <div className="textInSideBar" onClick={goToCreateProfile}>
              Add Pet
            </div>
          </div>

           {/* Logout Button */}
          {/* Logout Button - Positioned below the sidebar */}
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
        </div>
      </div>
  );
};

export default Sidebar;

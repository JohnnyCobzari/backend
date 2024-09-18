import React, { useState } from 'react';
import { FaRegUser, FaSignOutAlt, FaDog, FaPlus, FaBars } from "react-icons/fa";
import "../styles/SideBar.css"; // Link to the CSS file for styles
import { useNavigate } from "react-router-dom";

const AskIfUserWantsToLogOut = ({ onDelete, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to log out?</h3>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onDelete}>Log Out</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for sidebar open/close
  const [showSubMenu, setShowSubMenu] = useState(false); // State for sub-menu toggle
  const [showModal, setShowModal] = useState(false); // State for showing logout modal
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar open/close
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu); // Toggle the sub-menu open/close
  };

  const goToCreateProfile = () => {
    navigate('/AddPet'); // Navigate to AddPet page
  };

  const goToPetProfile = (id) => {
    navigate(`/ProfilePage/${id}`); // Navigate to the specific pet profile
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userPets');
    navigate('/');
  };

  const pets = JSON.parse(localStorage.getItem('userPets') || '[]'); // Get pets from localStorage

  return (
    <div className={isOpen ? 'sidebar expanded' : 'sidebar'}>
      {/* Toggle Button */}
      <div className="toggle-btn-container">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar Header */}
      <div className="head">
        
        {isOpen && (
          <div className="user-details">
            <p className="title">MENU</p>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="nav">
        <div className="menu">
          <ul>
            <li>
              <a href="#">
                <FaRegUser className="icon" />
                {isOpen && <span className="text">User Profile</span>}
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleSubMenu}>
                <FaDog className="icon" />
                {isOpen && <span className="text">Pets</span>}
              </a>
              {showSubMenu && isOpen && (
                <ul className="sub-menu">
                  {pets.map((pet, index) => (
                    <li key={index}>
                      <a href="#" onClick={() => goToPetProfile(pet._id)}>
                        <img src={pet.image} className="icon" alt={pet.petName} />
                        {isOpen && <span className="text">{pet.petName}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="#">
              <a href="#" onClick={goToCreateProfile}>
                <FaPlus className="icon" />
                {isOpen && <span className="text">Add Pet</span>}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Account Section (Logout at the bottom) */}
      <div className="logout-container">
        <a href="#" onClick={() => setShowModal(true)} className="logout-btn">
          <FaSignOutAlt className="icon" />
          {isOpen && <span className="text">Logout</span>}
        </a>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <AskIfUserWantsToLogOut
          onDelete={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;

// src/Sidebar.js
import React, { useState } from 'react';
import '../styles/SideBar.css';
import PetForm from './CreateProfileForm';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <nav className="sidebar-menu">
        <ul>
            <PetForm/>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import "../styles/SideBar.css" // Import the separate CSS file

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? 'sidebar expanded' : 'sidebar'}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className="sidebar-content">
        
      </div>
    </div>
  );
};

export default Sidebar;

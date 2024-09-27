import React from "react";
import "../styles/SettingsModal.css"; // Make sure the relative path is correct


const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Nu afișa modalul dacă nu este deschis

  return (
    <div className="settings-popup">
      <div className="settings-item">
        <ul>
          <li>
            <a href="/updateProfile" className="textlinksettings">Update profile</a>
          </li>
          <li>
            <a href="/ForgotPassword" className="textlinksettings">Change password</a>
          </li>
          <li>
            <a href="/privacySettings" className="textlinksettings">Privacy settings</a>
          </li>
          <li>
            <a className="textlinksign" href="http://localhost:3000/serviceSignUp">
              Switch to Business Account!
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}  

export default SettingsModal;

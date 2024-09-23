import React, { useState } from 'react';
import '../styles/ChangePassword.css'; // Import the CSS file for styling

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Add logic to handle password change, e.g., calling API
    if (newPassword === confirmPassword) {
      setMessage("Password changed successfully.");
    } else {
      setMessage("Passwords do not match.");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email"
          required
        />
        <label>New Password</label>
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="Enter new password"
          required
        />
        <label>Confirm Password</label>
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm new password"
          required
        />
        {message && <p className="message">{message}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;

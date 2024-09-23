import React, { useState } from "react";
import "../styles/ChangePassword.css";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3002', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  }
});

function ChangePassword() {
  const navigate = useNavigate();
  const { resetToken } = useParams(); // Get the token from the URL

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handler for new password input change
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  // Handler for confirm password input change
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // API call to reset password
    api.post(`/auth/reset-password/${resetToken}`, { password: newPassword })
      .then((response) => {
        setMessage("Your password has been successfully changed.");
        setError("");
        setNewPassword("");
        setConfirmPassword("");
        navigate('/login'); // Redirect to login page after success
      })
      .catch((err) => {
        if (err.response.data.message) {
          console.log('Error from backend:', err.response.data.message);
          setError(err.response.data.message);
        } else {
          setError("An error occurred while resetting your password.");
        }
        setMessage(""); // Clear any previous success messages
      });
  };

  return (
    <div>
      <Logo />
      <div className="uperContainerForImagesPage2">
        <img src="images/ChangePasswordDog.png" className="logInPet" alt="Change Password Dog" />
        <img src="images/WELCOME!.png" id="welcome" alt="Welcome" />
        <img src="images/ChangePasswordCat.png" className="logInPet" alt="Change Password Cat" />
      </div>

      <form id="change-password-form" onSubmit={handleSubmit}>
        <p className="emailAndpasword">New Password</p>
        <div className="input_filed">
          <input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        <p className="emailAndpasword">Confirm Password</p>
        <div className="input_filed">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button type="submit" className="reset-password">Reset Password</button>
      </form>

      <Footer />
    </div>
  );
}

export default ChangePassword;

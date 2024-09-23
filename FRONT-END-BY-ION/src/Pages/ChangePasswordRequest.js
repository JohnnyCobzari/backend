import React, { useState } from "react";
import "../styles/ChangePasswordRequest.css";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3002', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  }
});

function ChangePasswordRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handler for email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // API call to request the password reset link
    api.post('/auth/reset-password', { email: email })
      .then((response) => {
        setMessage("Password reset link has been sent to your email.");
        setError("");
        setEmail(""); // Clear the email input field after submission
      })
      .catch((err) => {
        if (err.response.data.message) {
          console.log('Error from backend:', err.response.data.message);
          setError(err.response.data.message);
        } else {
          setError("An error occurred while sending the reset link.");
        }
        setMessage(""); // Clear any previous success messages
      });
  };

  return (
    <div>
      <Logo />
      <div className="uperContainerForImagesPage2">
        <img src="images/LogInDog.png" className="logInPet" alt="Log In Dog" />
        <img src="images/WELCOME!.png" id="welcome" alt="Welcome" />
        <img src="images/logInCat.png" className="logInPet" alt="Log In Cat" />
      </div>

      <form id="request-reset-form" onSubmit={handleSubmit}>
        <p className="emailAndpasword">Email</p>
        <div className="input_filed">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button type="submit" className="send-link">Send Reset Link</button>
      </form>

      <Footer />
    </div>
  );
}

export default ChangePasswordRequest;

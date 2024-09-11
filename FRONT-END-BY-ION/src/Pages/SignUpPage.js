import React, { useState } from "react";
import axios from 'axios';
import Footer from "../components/Footer";
import Logo from "../components/Logo";

const api = axios.create({
  baseURL: 'http://localhost:3002', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  }
});

// Function to set the token in headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization'];
  }
};




function SignUpPage() {
  // State pentru câmpurile de input și mesajul de eroare
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  // Handler pentru schimbarea valorii email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handler pentru schimbarea valorii password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handler pentru schimbarea valorii confirmPassword
  const handlePasswordChange2 = (event) => {
    setPassword2(event.target.value);
  };

  // Handler pentru trimiterea formularului
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne reîncărcarea paginii

    // Verifică dacă cele două parole coincid
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    // Dacă parolele coincid, resetează mesajul de eroare și procesează formularul
    setError("");

    axios.post('http://localhost:3002/auth/signup', {
      name: 'User', // Adjust according to your DTO
      email: email,
      password: password,
    })
    .then((response) => {

      const token = response.data.token;
    localStorage.setItem('authToken', token);

    // Update Axios default headers
    setAuthToken(token);
      // Reset fields after successful submission
      setEmail("");
      setPassword("");
      setPassword2("");
    })
    .catch((err) => {
      // Handle errors
      setError("An error occurred while signing up.");
    });
  };

  return (
    <div>
      <Logo />
      <div className="uperContainerForImagesPage2">
        <img src="images/LogInDog.png" className="logInPet" alt="LogIn Dog" />
        <img src="images/WELCOME!.png" id="welcome" alt="Welcome" />
        <img src="images/logInCat.png" className="logInPet" alt="LogIn Cat" />
      </div>

      <form id="login-form" onSubmit={handleSubmit}>
        <p className="emailAndpasword">Email</p>

        <div className="input_filed">
          <input
            type="email"
            id="email"
            placeholder="Username"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <p className="emailAndpasword">New password</p>

        <div className="input_filed">
          <input
            type="password"
            className="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <p className="emailAndpasword">Confirm Password</p>

        <div className="input_filed">
          <input
            type="password"
            className="password"
            placeholder="Password"
            value={password2}
            onChange={handlePasswordChange2}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>} {/* Afișează mesajul de eroare */}

        <button type="submit" className="login">Sign Up</button>
        <p className="paragraf">
          Already have an account? <a href="LogIn" className="sign-up">Log In</a>
        </p>
      </form>

      <div className="FooterImageBoxPage2">
        <img src="images/LogInUnder.png" alt="Footer Image" />
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;

import React, { useEffect, useState } from "react";
import "../styles/LogInPage.css";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

function LoginPage() {
  
  const navigate = useNavigate();
  
  // State pentru câmpurile de input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Definește error și setError
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Dacă tokenul există, setează header-ul și redirecționează utilizatorul
      setAuthToken(token);
      navigate('/HomePage'); // Redirecționează către dashboard sau altă pagină
    }
  }, []);

  // Handler pentru schimbarea valorii email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handler pentru schimbarea valorii password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handler pentru trimiterea formularului
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne reîncărcarea paginii
    axios.post('http://localhost:3002/auth/login', {
      email: email,
      password: password,
    })
    .then((response) => {

      const { token, userId } = response.data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);

    // Update Axios default headers
    setAuthToken(token);
      // Reset fields after successful submission
      setEmail("");
      setPassword("");
      setError("");
      navigate('/HomePage'); 
      
    })
    .catch((err) => {
      // Check if the error has a response and a message
      if (err.response.data.message) {
        console.log('Error message from backend:', err.response.data.message); // Check in the console
        setError(err.response.data.message);  // Set the backend message as the error
      } else {
        setError("An error occurred while logging in.");  // Fallback message
      }
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

        <p className="emailAndpasword">Password</p>

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
        {error && <p className="error-message">{error}</p>} {/* Afișează mesajul de eroare */}
        <a href="#" className="forgot">
          <p>Forgot password</p>
        </a>
        <button type="submit" className="login">Login</button>
        <p className="paragraf">
          Don't have an account? <a href="SignUp" className="sign-up">sign-up</a>
        </p>
      </form>

      <div className="FooterImageBoxPage2">
        <img src="images/LogInUnder.png" alt="Footer Image" />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;

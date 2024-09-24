import React, { useEffect, useState } from "react";
import "../styles/LogInPage.css";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../components/DragAndDrop";

function ServiceSignUp() {
  const navigate = useNavigate();

  // State pentru câmpurile de input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(""); // new field for repeated password
  const [userName, setUserName] = useState("");
  const [companyDirector, setCompanyDirector] = useState(""); // new field for company director
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [imageSrcDoc, setImageSrcDoc] = useState("");
  const [imageSrcUser, setImageSrcUser] = useState("");
  const [imageDoc, setImageDoc] = useState(''); // Stare pentru imaginea documentului
  const [imageUser, setImageUser] = useState(''); // Stare pentru imaginea utilizatorului

  const handleDocUpload = (newImageUrl) => {
    setImageDoc(newImageUrl); // Actualizăm imaginea documentului
  };

  const handleUserUpload = (newImageUrl) => {
    setImageUser(newImageUrl); // Actualizăm imaginea utilizatorului
  };

  // Handlers for input changes
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRepeatPasswordChange = (event) => setRepeatPassword(event.target.value);
  const handleNameChange = (event) => setUserName(event.target.value);
  const handleCompanyDirectorChange = (event) => setCompanyDirector(event.target.value);

  // Handler pentru trimiterea formularului
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne reîncărcarea paginii
    
    // Validate if passwords match
    if (password !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    const formData = {
      email,
      password,
      repeatPassword,
      userName,
      companyDirector,
      documentImageUrl: imageSrcDoc,
      userPhotoUrl: imageSrcUser,
    };
    
    // Simulate form submission or send data to the backend
    axios.post('http://localhost:3002/auth/signup', formData)
      .then((response) => {
        const { token, userId } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);

        setAuthToken(token);

        // Reset fields after successful submission
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setUserName("");
        setCompanyDirector("");
        setImageSrcDoc("");
        setImageSrcUser("");
        setError("");
        navigate('/HomePage');
      })
      .catch((err) => {
        if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred while signing up.");
        }
      });
  };

  return (
    <div>
      <Logo />
      <div className="uperContainerForImagesPage2">
        <img src="images/LogInDog.png" className="logInPet" alt="LogIn Dog" />
        <img src="./Admin_services_foto/Welcome to our pet care community!.png" id="welcome" alt="Welcome" />
        <img src="images/logInCat.png" className="logInPet" alt="LogIn Cat" />
      </div>

      <form id="login-form" onSubmit={handleSubmit}>
        <p className="emailAndpasword">Email</p>
        <div className="input_filed">
          <input
            type="email"
            id="email"
            placeholder="Email"
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

        <p className="emailAndpasword">Repeat Password</p>
        <div className="input_filed">
          <input
            type="password"
            className="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
          />
        </div>

        <p className="emailAndpasword">User Name</p>
        <div className="input_filed">
          <input
            type="text"
            className="password"
            placeholder="User name"
            value={userName}
            onChange={handleNameChange}
            required
          />
        </div>

        <p className="emailAndpasword">Company Director's Name</p>
        <div className="input_filed">
          <input
            type="text"
            className="password"
            placeholder="Company Director's Name"
            value={companyDirector}
            onChange={handleCompanyDirectorChange}
            required
          />
        </div>

        <p className="emailAndpasword" style={{ fontSize: '16px' }}>Upload a photo to verify your pet service</p>
        <ImageUpload onImageUpload={handleDocUpload} label="Document" />
      
        <p className="emailAndpasword" style={{ fontSize: '16px' }}>Upload a photo with you</p>
        <ImageUpload onImageUpload={handleUserUpload} label="User" />

        {error && <p className="error-message">{error}</p>} 

        <button type="submit" className="login">Sign Up for pet service account</button>
        <p className="paragraf">
          Already have an account? <a href="LogIn" className="sign-up">Log In</a>
        </p>
      </form>

      <div className="FooterImageBoxPage2">
        <img src="images/LogInUnder.png" alt="Footer Image" />
      </div>
      <Footer/>
    </div>
  );
}

export default ServiceSignUp;

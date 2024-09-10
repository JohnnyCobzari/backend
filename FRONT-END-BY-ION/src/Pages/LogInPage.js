import React, { useEffect, useState } from "react";
import "../styles/LogInPage.css";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  
  const navigate = useNavigate();
  
  // State pentru câmpurile de input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    console.log("Email:", email);
    console.log("Password:", password);

    // FETCH CATRE Server
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Response from server:", data); // Expecting "OK"
      } else {
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }

    // Resetare câmpuri după trimitere
    setEmail("");
    setPassword("");
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

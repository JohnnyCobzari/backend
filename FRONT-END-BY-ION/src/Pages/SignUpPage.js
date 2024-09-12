import React, { useState , useEffect} from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";



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
  // State pentru câmpurile de input și mesaje de eroare/avertizare
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Dacă tokenul există, setează header-ul și redirecționează utilizatorul
      setAuthToken(token);
      navigate('/HomePage'); // Redirecționează către dashboard sau altă pagină
    }
  }, [navigate]);

  // Funcție care verifică puterea parolei
  const validatePasswordStrength = (password) => {
    const minLength = 6;
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 6 characters long.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number.";
    }
    

    return ""; // Parola este puternică
  };

  // Handler pentru schimbarea valorii email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handler pentru schimbarea valorii password
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Validează puterea parolei și afișează avertismentul dacă este slabă
    const warning = validatePasswordStrength(newPassword);
    setPasswordWarning(warning);
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

    // Verifică dacă există avertismente pentru parola slabă
    if (passwordWarning) {
      setError(passwordWarning);
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
      const { token, userId } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);

      // Update Axios default headers
      setAuthToken(token);

      // Resetez câmpurile după trimitere
      setEmail("");
      setPassword("");
      setPassword2("");

      // go to the home page
      navigate('/HomePage'); //<============================================
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

        {/* Afișează avertismentul dacă parola este slabă */}
        {/*passwordWarning && <p className="warning-message">{passwordWarning}</p>*/}

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

        {/*
        <p className="emailAndpasword">User Name</p>
        
        <div className="input_filed">
          <input
            type="text"
            className="password"
            placeholder="User Name"
            //value={password2}
            //onChange={handlePasswordChange2}
            required
          />
        </div>*/}

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

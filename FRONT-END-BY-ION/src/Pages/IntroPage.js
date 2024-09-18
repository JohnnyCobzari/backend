import React, { useEffect} from "react";
import "../styles/IntroPage.css";
import Footer from "../components/Footer";
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
function IntroPage() {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Dacă tokenul există, setează header-ul și redirecționează utilizatorul
          setAuthToken(token);
          navigate('/HomePage'); // Redirecționează către dashboard sau altă pagină
        }
      }, [navigate]);

    const GoToLogIn = () =>{
        navigate("/LogIn");
    }


    return (
      <>
        <section>
          <div className="container">
            <header>
              <a href="#" className="logo">
                <img src="/images/logo.png" alt="Logo" />
              </a>
              
              <ul>
                <li><a href="#" className="active">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#" onClick={GoToLogIn}>Login</a></li>
              </ul>
            </header>
            
            <div className="content">
              <h2>Connecting pet owners for breeding and services with interactive maps</h2>
              <a href="#"><img src="/images/img1.png" alt="Image 1" /></a>
              <p>
                In today's world, pet ownership is at an all-time high, with dogs and cats becoming integral members of many households. However, finding suitable partners for breeding and accessing essential pet services like veterinary care, grooming, and pet shops remains a challenge for many pet owners. PawPaw provides you the solution. Find here a match for your pet!
              </p>
            </div>
    
            <div className="imgBox">
              <img src="/images/dog1.png" alt="Dog Image" />
              <a href="#" className="btn" onClick={GoToLogIn}>Create Profile Now</a>
            </div>
    
            <ul className="sci">
              <li><a href="#"><img src="/images/facebook.png" alt="Facebook" /></a></li>
              <li><a href="#"><img src="/images/instagram.png" alt="Instagram" /></a></li>
            </ul>
          </div>
        </section>
        <Footer />
      </>
    );
    
}

export default IntroPage;
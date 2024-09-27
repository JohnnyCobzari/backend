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
            <div className="header">
                <div className="logo">
                    <p>PawPaw</p>
                    <img src="/images/paw.png" alt="PawPaw logo" />
                </div>
                
                <div className="headerBox">
                    <p>Who We Are</p>
                    <img src="/images/Cart button.png" alt="Cart button" onClick={GoToLogIn}/>
                </div>
            </div>

            <p className="FrontBigTextFromFirstPage">
                Connecting pet owners for breeding and services with interactive maps
            </p>

            <div className="buttonBox">
                <img src="/images/Button.png" alt="Button"  onClick={GoToLogIn} />
            </div>

            <div className="firstPageImagecontainer">
                <img className="firstPageImage" src="/images/firstPageImage.png" alt="First page image" />
            </div>

            <a className="textlink" href="http://localhost:3000/serviceSignUp">
             Add your business to our pet service map!
            </a>

            <p className="smallTextAtTheButton">
                In today's world, pet ownership is at an all-time high, with dogs and cats becoming integral members of many households. However, finding suitable partners for breeding and accessing essential pet services like veterinary care, grooming, and pet shops remains a challenge for many pet owners. PawPaw provides you the solution. Find here a match for your pet!
            </p>
            <Footer/>
        </>
    );
}

export default IntroPage;

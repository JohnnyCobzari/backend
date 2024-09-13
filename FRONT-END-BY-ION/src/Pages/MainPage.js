import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import Logo from "../components/Logo"
import MapBox from "../components/MapBox";
import "../styles/HomePage.css"
import axios from "axios";
import Loading from "../components/LoadingAnimation";

const MainPage = () => {
  const [allPets, setAllPets] = useState([]);
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
  
       
        // Fetch pets from the API if not in localStorage
        const response = await axios.get('http://localhost:3002/pets', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            userId, // Pass the userId as a query parameter
          },
        });
  
        setAllPets(response.data.allPets);
        setUserPets(response.data.userPets);
  
        // Save fetched data to localStorage
        localStorage.setItem('userPets', JSON.stringify(response.data.userPets));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pets.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPets();
  }, [navigate]);
  

  if (loading) return (<Loading/>);
  if (error) return <p>{error}</p>;
  
  return (
      <>
        <Sidebar />
        <Logo />
        <MapBox />
        
      </>
    );
  };
  
  export default MainPage;
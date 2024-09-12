import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import Logo from "../components/Logo"
import MapBox from "../components/MapBox";
import "../styles/HomePage.css"
import axios from "axios";

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
  
        // Check if data is available in localStorage
        const storedAllPets = localStorage.getItem('allPets');
        const storedUserPets = localStorage.getItem('userPets');
  
        if (storedAllPets && storedUserPets) {
          setAllPets(JSON.parse(storedAllPets));
          setUserPets(JSON.parse(storedUserPets));
          setLoading(false);
          return; // Skip the fetch if data is in localStorage
        }
  
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
        localStorage.setItem('allPets', JSON.stringify(response.data.allPets));
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
  

  if (loading) return <p>Loading...</p>;
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
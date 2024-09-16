import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import MapBox from "../components/MapBox";
import "../styles/HomePage.css";
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

        // Fetch pets from the API
        const response = await axios.get('http://localhost:3002/pets', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            userId, // Pass the userId as a query parameter
          },
        });

        // Filter pets that have valid coordinates (latitude and longitude)
        const petsWithCoordinates = response.data.allPets.filter(
          (pet) => pet.latitude && pet.longitude
        );
        

        setAllPets(petsWithCoordinates); // Send only pets with coordinates to state
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

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Sidebar />
      <Logo />
      {allPets.length > 0 ? (
        <MapBox pets={allPets} /> 
      ) : (
        <p>No pets available with valid location data.</p>
      )}
    </>
  );
};

export default MainPage;

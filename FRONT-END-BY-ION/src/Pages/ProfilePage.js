import React, { useEffect, useState } from "react";
import { FaDog, FaSyringe, FaPhone, FaClinicMedical, FaDollarSign, FaVenusMars, FaCalendarAlt, FaAllergies, FaUser } from "react-icons/fa";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Logo from "../components/Logo";
import "../styles/ProfilePage.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {

  const navigate = useNavigate();

  const goToHomePage2 = () =>{
    navigate('/Homepage')
  }
  const { id } = useParams(); // Get the pet ID from the URL
  const [petProfile, setPetProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        const response = await axios.get(`http://localhost:3002/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authorization
          },
        });
        
        setPetProfile(response.data); // Assuming the backend sends the pet object
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load pet profile.");
        setLoading(false);
      }
    };

    fetchPetProfile();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Sidebar />
      <div onClick={goToHomePage2} style={{ cursor: "pointer" }}>
        <Logo />
      </div>
      <div className="Profile-info">
        <div className="Profile-ImageContainer">
          <img src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg" alt="Pet"></img>
        </div>
       
        <h2 className="profile-name">{petProfile.petName}</h2>
        <div className="Pet-Info">
          <p><FaVenusMars /> Gender: {petProfile.gender}</p>
          <p><FaDog /> Breed: {petProfile.breed}</p>
          <p><FaCalendarAlt /> Age: {petProfile.age}</p>
          <p><FaUser /> Owner: {petProfile.ownerName}</p>
          <p><FaPhone /> Phone: {petProfile.ownerNumber}</p>
          <p><FaSyringe /> Vaccinated: {petProfile.vaccinated}</p>
          <p><FaAllergies /> Allergies: {petProfile.allergies}</p>
          <p><FaClinicMedical /> Vet: {petProfile.vetInfo}</p>
          <p><FaDollarSign /> Breeding Price: {petProfile.breedingPrice}</p>
        </div>
        <p id='edit-infoProfile'>Edit Profile</p>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;

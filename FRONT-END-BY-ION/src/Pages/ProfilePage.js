import React from "react";
import { FaDog, FaSyringe, FaPhone, FaClinicMedical, FaDollarSign, FaVenusMars, FaCalendarAlt, FaAllergies, FaUser } from "react-icons/fa";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Logo from "../components/Logo";
import "../styles/ProfilePage.css";

function ProfilePage() {

  const navigate = useNavigate();

  const goToHomePage2 = () =>{
    navigate('/Homepage')
  }
  const petProfile = {
    name: "Bobby",
    image: "/path/to/image.png", // Update with the actual image path
    gender: "Male",
    breed: "Unknown",
    age: "3 months",
    owner: {
      name: "John",
      phoneNumber: "+37370000000",
    },
    vaccinated: "Yes",
    allergies: "None",
    veterinarianInfo: {
      name: "Optim Vet Clinic",
      location: "Ciocana, Chisinau",
    },
    readyForBreeding: "Yes",
    breedingPrice: "0$",
  };

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
        <h2 className="profile-name">{petProfile.name}</h2>
        <div className="Pet-Info">
          <p><FaVenusMars /> Gender: {petProfile.gender}</p>
          <p><FaDog /> Breed: {petProfile.breed}</p>
          <p><FaCalendarAlt /> Age: {petProfile.age}</p>
          <p><FaUser /> Owner: {petProfile.owner.name}</p>
          <p><FaPhone /> Phone: {petProfile.owner.phoneNumber}</p>
          <p><FaSyringe /> Vaccinated: {petProfile.vaccinated}</p>
          <p><FaAllergies /> Allergies: {petProfile.allergies}</p>
          <p><FaClinicMedical /> Vet: {petProfile.veterinarianInfo.name}, {petProfile.veterinarianInfo.location}</p>
          <p><FaDollarSign /> Breeding Price: {petProfile.breedingPrice}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;

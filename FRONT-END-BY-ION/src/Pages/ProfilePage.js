import React, { useEffect, useState } from "react";
import { FaDog, FaSyringe, FaPhone, FaClinicMedical, FaDollarSign, FaVenusMars, FaCalendarAlt, FaAllergies, FaUser } from "react-icons/fa";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Logo from "../components/Logo";
import "../styles/ProfilePage.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from "../components/LoadingAnimation";
import { MdDelete, MdEdit } from 'react-icons/md';

const PetProfileDeleteModal = ({ petName, onDelete, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete {petName}'s profile?</h3>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onDelete}>Delete</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the pet ID from the URL
  const [petProfile, setPetProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPetInUserPets, setIsPetInUserPets] = useState(false); // To track if the pet is in userPets

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
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load pet profile.");
        setLoading(false);
      }
    };

    fetchPetProfile();
  }, [id]);

  // Check if the current pet is in userPets
  useEffect(() => {
    const userPets = JSON.parse(localStorage.getItem('userPets'));
    if (userPets && userPets.some(pet => pet._id === id)) {
      setIsPetInUserPets(true);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3002/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // JWT token for authorization
        },
      });
      console.log('Pet profile deleted');
      setShowModal(false);
      navigate('/Homepage'); // Redirect to homepage after deletion
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (loading) return <Loading />; // Show loading animation
  if (error) return <p>{error}</p>;

  return (
    <>
      <div onClick={() => navigate('/Homepage')} style={{ cursor: "pointer" }}>
        <Logo />
      </div>
      <div className="Profile-info">
        <div className="Profile-ImageContainer">
          <img src={petProfile.image} alt="Pet"></img>
        </div>
        <h2 className="profile-name">{petProfile.petName}</h2>
        <div className="Pet-Info">
          <p><FaVenusMars /> Gender: {petProfile.gender}</p>
          <p><FaDog /> Breed: {petProfile.breed}</p>
          <p><FaCalendarAlt /> Age: {petProfile.age}</p>
          <p><FaUser /> Owner: {petProfile.ownerName}</p>
          <p><FaPhone /> Phone: {petProfile.ownerPhone}</p>
          <p><FaSyringe /> Vaccines:</p>
            <ul>
              {petProfile.vaccines && petProfile.vaccines.map((vaccine, index) => (
                <li key={index}>{vaccine.name}</li>
              ))}
            </ul>
          <p><FaAllergies /> Allergies: {petProfile.allergies}</p>
          <p><FaClinicMedical /> Vet: {petProfile.vetInfo}</p>
          {petProfile.readyForBreeding && (<p><FaDollarSign /> Breeding Price: {petProfile.breedingPrice}</p>)}
        </div>

        {/* Conditionally display Edit and Delete buttons */}
        {isPetInUserPets && (
          <div className="EditAndDeleteProfile">
            <div onClick={() => navigate(`/EditProfilePage/${id}`, { state: { petProfile, image: petProfile.image, id } })}>
              <MdEdit /><p id='edit-infoProfile'>Edit Profile</p>
            </div>
            <div onClick={() => setShowModal(true)}>
              <MdDelete /><p id='edit-infoProfile'>Delete Profile</p>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <PetProfileDeleteModal
          petName={petProfile.petName}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
      <Footer />
    </>
  );
}

export default ProfilePage;

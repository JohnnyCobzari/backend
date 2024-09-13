import React from 'react';
import { Navigate } from 'react-router-dom';
import Logo from '../components/Logo';
import PetForm from '../components/CreateProfileForm';
import { useLocation } from 'react-router-dom';
import EditPetForm from '../components/EditPetForm';
import Footer from '../components/Footer';


function EditProfilePage() {

    const location = useLocation();
    const { petProfile, image, id } = location.state;
  
  return (
    <>
        <Logo/>
        <EditPetForm petProfile={petProfile} image={image} id={id} />
        <Footer/>
    </>  
  );
}

export default EditProfilePage;

import React from 'react';
import { Navigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useLocation } from 'react-router-dom';
import EditPetForm from '../components/EditPetForm';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


function EditProfilePage() {
  const location = useLocation();
  const { petProfile, image, id } = location.state;
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/HomePage');
  };

  return (
    <>
      <div onClick={goToHomePage} style={{ cursor: 'pointer' }}>
        <Logo />
      </div>
      <div id="CREATEYOURPETPROFILE">
        <img src="/images/EditPetProfileImage.png"></img>
      </div>
      <div className="uperContainerForImagesEditPage">
        <img
          src="/images/CaineSiPisicaDePeEditProfile.png"
          className="logInPet"
          alt="LogIn Cat"
        />
      </div>
      <EditPetForm petProfile={petProfile} image={image} id={id} />
      <div className="FooterImageBoxPage2">
        <img src="/images/LogInUnder.png" alt="Footer Image" />
      </div>
      <Footer />
    </>
  );
}

export default EditProfilePage;

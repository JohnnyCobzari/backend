import React from "react";
import "../styles/IntroPage.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import PetForm from "../components/CreateProfileForm";
import Logo from "../components/Logo";

function AddPetPage() {

    const navigate = useNavigate();



    return (
    <>
        <Logo/>
        <div className="uperContainerForImagesPage2">
        <img src="images/LogInDog.png" className="logInPet" alt="LogIn Dog" />
        <img src="images/logInCat.png" className="logInPet" alt="LogIn Cat" />
        </div>
        <PetForm/>
        <div className="FooterImageBoxPage2">
            <img src="images/LogInUnder.png" alt="Footer Image" />
        </div>
        <Footer/>
    </>
    );
}

export default AddPetPage;

import React from "react";
import "../styles/IntroPage.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

function IntroPage() {

    const navigate = useNavigate();

    const GoToLogIn = () =>{
        navigate("/LogIn");
    }


    return (
        <>
            <Sidebar/>
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

            <p className="smallTextAtTheButton">
                In today's world, pet ownership is at an all-time high, with dogs and cats becoming integral members of many households. However, finding suitable partners for breeding and accessing essential pet services like veterinary care, grooming, and pet shops remains a challenge for many pet owners. PawPaw provides you the solution. Find here a match for your pet!
            </p>
            <Footer/>
        </>
    );
}

export default IntroPage;

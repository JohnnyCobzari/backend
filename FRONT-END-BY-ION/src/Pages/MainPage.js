import React from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import Logo from "../components/Logo"
import MapBox from "../components/MapBox";
import "../styles/HomePage.css"

const MainPage = () => {
    return (
      <>
        <Sidebar />
        <Logo />
        <MapBox />
        
      </>
    );
  };
  
  export default MainPage;
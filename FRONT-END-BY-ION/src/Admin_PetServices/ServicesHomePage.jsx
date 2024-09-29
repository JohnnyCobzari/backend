import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLocals from "./ServicesComponets/sideBarLocals";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import MapBox from "../components/MapBox";
import "../styles/HomePage.css";
import axios from "axios";
import Loading from "../components/LoadingAnimation";
import ErrorPage from "../components/ErrorPage";
import "../styles/NotificationIcon.css";
import NotificationIcon from "../components/NotificationIcon";
import Header from "../components/Header";
import AddLocalForm from "./ServicesComponets/AddLocalForm";


const ServiceHomePage = () => {
	const [isOpen, setIsOpen] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
	const [allPets, setAllPets] = useState([]);
	const [userPets, setUserPets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

    const toggleForm = () => {
        setIsOpenForm(!isOpenForm);
    };

	useEffect(() => {
		const fetchPets = async () => {
			try {
				const token = localStorage.getItem("authToken");
				const userId = localStorage.getItem("userId");

				// Fetch pets from the API
				const response = await axios.get("http://localhost:3002/pets", {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				});

				// Filter pets that have valid coordinates (latitude and longitude)
				const petsWithCoordinates = response.data.allPets.filter((pet) => pet.latitude && pet.longitude);

				setAllPets(petsWithCoordinates); // Send only pets with coordinates to state
				setUserPets(response.data.userPets);

				// Save fetched data to localStorage
				localStorage.setItem("userPets", JSON.stringify(response.data.userPets));
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
	if (error) return <ErrorPage />;

	return (
		<>
			<Header setIsOpen={setIsOpen} isOpen={isOpen} showMatch={false} />
			<SidebarLocals isOpen={isOpen} isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} />
			<MapBox pets={allPets} />
			<div className="addLocalButton">
				<div className="AddLocalHover" onClick={toggleForm}>
					<img src="./Admin_services_foto/addLocalButton.png" alt="buton" />
					<span className="tooltip">Add your local</span>
				</div>
			</div>
            <AddLocalForm isOpen={isOpenForm} setIsOpen={setIsOpenForm}/>
			<Footer />
		</>
	);
};

export default ServiceHomePage;

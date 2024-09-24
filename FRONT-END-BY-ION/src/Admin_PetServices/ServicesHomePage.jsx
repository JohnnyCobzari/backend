import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
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
    const [isOpenAdd, setIsOpenAdd] = useState(false);
	const [allPets, setAllPets] = useState([]);
	const [userPets, setUserPets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpenAdd(!isOpenAdd);
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
					},
					params: {
						userId, // Pass the userId as a query parameter
					},
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
			<Header setIsOpen={setIsOpen} isOpen={isOpen} />
			<Sidebar isOpen={isOpen} />
			<MapBox pets={allPets} />
			<div className="addLocalButton">
				<div className="AddLocalHover" onClick={toggleSidebar}>
					<img src="./Admin_services_foto/addLocalButton.png" alt="buton" />
					<span className="tooltip">Add your local</span>
				</div>
			</div>
            <AddLocalForm isOpen={isOpenAdd} setIsOpen={setIsOpenAdd}/>
			<Footer />
		</>
	);
};

export default ServiceHomePage;

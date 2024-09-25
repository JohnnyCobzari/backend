import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import "../styles/SideBar.css"; // Import the separate CSS file
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
	const navigate = useNavigate();

	const goToCreateProfile = () => {
		navigate("/AddPet");
	};

	const goToPetProfile = (id) => {
		navigate(`/ProfilePage/${id}`);
	};

	// Array to store pet information (name and image link)
	//!!!!!!!!!!!!!! PENTRU ION ---> in asa gen de tabel doar ca cu toata info o sa trebuiasca sa primim de la back
	const pets = JSON.parse(localStorage.getItem("userPets") || "[]");

	//Pentru a inchide side barul cand apesi inafara lui
	//------> {nam cod inca}

	return (
		<div className={isOpen ? "sidebar expanded" : "sidebar"}>
			<div className="sidebar-content">
				{pets.map((pet, index) => (
					<div className="iconUserProfileContainer" key={index} onClick={() => goToPetProfile(pet._id)}>
						<div className="ImageBoxSidebar">
							<img src={pet.image} className="pet-image" />
							<div>
								<div className="textInSideBarName">{pet.petName}</div>
								<div className="textInSideBarBreed">{pet.breed}</div>
							</div>
						</div>
						<div className="textInSideBar">{pet.petName}</div>
					</div>
				))}

				{/* Add Pet Button */}
				<div className="iconUserProfileContainer" onClick={goToCreateProfile}>
					<div className="ImageBoxSidebar">
						<img src="/images/AddButonSideBar.png" />
					</div>
					<div className="textInSideBar">Add Pet</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

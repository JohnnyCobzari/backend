import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarLocals = ({ isOpen, isOpenForm, setIsOpenForm }) => {
	const navigate = useNavigate();

	const goToCreateProfile = () => {
		navigate("/AddPet");
	};

	const goToLocalProfile = (id) => {
		navigate(`/LocalProfile/${id}`);
	};

    const toggleForm = () => {
        setIsOpenForm(!isOpenForm);
    };

	// Sample array to store local information (name and image link)
	const locals = [
		{ id: 1, name: "Local Park", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmt8ZW58MHx8MHx8fDA%3D" },
		{ id: 2, name: "Community Center", image: "https://static.wixstatic.com/media/0fc321_b46df26bf3fb4af59452459f29e56f71~mv2.png/v1/fill/w_614,h_614,al_c,lg_1,q_90/0fc321_b46df26bf3fb4af59452459f29e56f71~mv2.png" },
		{ id: 3, name: "Pet Store", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmt8ZW58MHx8MHx8fDA%3D" },
		// Add more local entries as needed
	];

	return (
		<div className={isOpen ? "sidebar expanded" : "sidebar"}>
			<div className="sidebar-content">
				{locals.map((local) => (
					<div
						className="iconUserProfileContainer"
						key={local.id}
						onClick={() => goToLocalProfile(local.id)}
					>
						<div className="ImageBoxSidebar">
							<img src={local.image} alt={local.name} className="local-image" />
							<div>
								<div className="textInSideBarName">{local.name}</div>
							</div>
						</div>
						<div className="textInSideBar">{local.name}</div>
					</div>
				))}

				{/* Add Pet Button */}
				<div className="iconUserProfileContainer" onClick={toggleForm}>
					<div className="ImageBoxSidebar">
						<img src="/images/AddButonSideBar.png" alt="Add Pet" />
					</div>
					<div className="textInSideBar">Add Local</div>
				</div>
			</div>
		</div>
	);
};

export default SidebarLocals;

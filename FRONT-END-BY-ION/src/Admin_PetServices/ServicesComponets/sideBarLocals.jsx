import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SidebarLocals = ({ isOpen, isOpenForm, setIsOpenForm }) => {
	const navigate = useNavigate();


	const goToCreateProfile = () => {
		navigate("/AddPet");
	};
	const [locals, setLocals]= useState([]);


	useEffect(() => {
		

		const userId = localStorage.getItem("userId");

		
			const response =axios.get(`http://localhost:3002/local/users-local/${userId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					"Content-Type": "application/json",
				},
			})
			.then(response => {
                setLocals(response.data);
				console.log(locals);
            })
            .catch(error => console.error('Error fetching notifications:', error));;

		
	});

	const goToLocalProfile = (id) => {
		navigate(`/LocalProfile/${id}`);
	};

    const toggleForm = () => {
        setIsOpenForm(!isOpenForm);
    };

	return (
		<div className={isOpen ? "sidebar expanded" : "sidebar"}>
			<div className="sidebar-content">
				{locals.map((local) => (
					<div
						className="iconUserProfileContainer"
						key={local._id}
						onClick={() => goToLocalProfile(local._id)}
					>
						<div className="ImageBoxSidebar">
							<img src={local.images[0]} alt={local.localName} className="local-image" />
							<div>
								<div className="textInSideBarName">{local.localName}</div>
							</div>
						</div>
						<div className="textInSideBar">{local.localName}</div>
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

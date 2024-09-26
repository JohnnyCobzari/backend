import React, { useState } from "react";
import "./AddLocalForm.css";
import { FiX } from "react-icons/fi";
import ImageUpload from "../../components/DragAndDrop";
import GeolocationComponent from "../../components/Geolocation";
import MultipleImageUpload from "./MultipleFileUpload";

const SideBarAdd = ({ isOpen, setIsOpen }) => {
	// State for form inputs
	const [localType, setLocalType] = useState("");
	const [localName, setLocalName] = useState("");
	const [localInfo, setLocalInfo] = useState("");
	const [address, setAddress] = useState("");
	const [latitude, setLatitude] = useState(null); // Latitude
	const [longitude, setLongitude] = useState(null); // Longitude
	const [ImagesUpload, onImagesUpload] = useState([]);

	const handleCoordinatesFetched = (lat, lng) => {
		setLatitude(lat);
		setLongitude(lng);
	};

	// Handle form submission (if required)
	const handleFormSubmit = (e) => {
		e.preventDefault();

		const userId = localStorage.getItem("userId");

		// Create an object with form data
		const addLocalForm = {
			userId,
			localType,
			localName,
			localInfo,
			address,
			latitude,
			longitude,
			images: ImagesUpload,
		};

		console.log(addLocalForm); // Replace with actual form submission logic
	};

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={`sidebar-add ${isOpen ? "open-add" : ""}`}>
			<button className="toggle-button-add" onClick={toggleSidebar}>
				<FiX size={24} />
			</button>
			<div className="content-add" style={{ marginTop: "56px" }}>
				<form onSubmit={handleFormSubmit}>
					<p className="writingFromPetLogIn">Select the type of your local business</p>
					<div className="input_filed">
						<select name="localType" value={localType} onChange={(e) => setLocalType(e.target.value)} required>
							<option value="" disabled>
								Tap to select
							</option>
							<option value="Veterinarian">Veterinarian</option>
							<option value="Pet Shop">Pet Shop</option>
							<option value="Grooming">Grooming</option>
							<option value="Pet Hotel">Pet Hotel</option>
						</select>
					</div>

					<p className="writingFromPetLogIn">Local Name</p>
					<div className="input_filed">
						<input type="text" name="localName" placeholder="ex: Bobby" value={localName} onChange={(e) => setLocalName(e.target.value)} required />
					</div>

					<p className="writingFromPetLogIn">Info</p>
					<div className="input_filed">
						<textarea type="text" name="localInfo" placeholder="Enter info" value={localInfo} onChange={(e) => setLocalInfo(e.target.value)} required />
					</div>

					<p className="writingFromPetLogIn">Local's Address</p>
					<div className="input_filed">
						<input type="text" name="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required />
					</div>

					<GeolocationComponent address={address} onLocationFetched={handleCoordinatesFetched} />

					<p className="writingFromPetLogIn">Upload Images of your local</p>
					<MultipleImageUpload onImagesUpload={onImagesUpload} />
					<button className="LocalUploadForm" type="submit">
						Add your pet local
					</button>
				</form>
			</div>
		</div>
	);
};

export default SideBarAdd;

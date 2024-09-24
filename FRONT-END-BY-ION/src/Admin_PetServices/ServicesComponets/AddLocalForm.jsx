import React, { useState } from "react";
import "./AddLocalForm.css";
import { FiX } from "react-icons/fi";
import ImageUpload from "../../components/DragAndDrop";
import GeolocationComponent from "../../components/Geolocation";

const SideBarAdd = ({ isOpen, setIsOpen }) => {
	// State for form inputs
	const [localType, setLocalType] = useState("");
	const [localName, setLocalName] = useState("");
	const [localInfo, setLocalInfo] = useState("");
	const [address, setAddress] = useState("");
	const [documentImage, setDocumentImage] = useState(null);
	const [latitude, setLatitude] = useState(null); // Latitude
	const [longitude, setLongitude] = useState(null); // Longitude

	const handleCoordinatesFetched = (lat, lng) => {
		setLatitude(lat);
		setLongitude(lng);
	};

	// Handle form submission (if required)
	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Create an object with form data
		const addLocalForm = {
			localType,
			localName,
			localInfo,
			address,
			documentImage,
			coordinates: {
				latitude,
				longitude,
			},
		};

		console.log(addLocalForm); // Replace with actual form submission logic
	};

	const handleImageUpload = (imageFile) => {
		setDocumentImage(imageFile); // Capture image file from ImageUpload component
	};

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={`sidebar-add ${isOpen ? "open-add" : ""}`}>
			<button className="toggle-button-add" onClick={toggleSidebar}>
				<FiX size={24} />
			</button>
			<div className="content-add">
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
						<input type="text" name="localInfo" placeholder="Enter info" value={localInfo} onChange={(e) => setLocalInfo(e.target.value)} required />
					</div>

					<p className="writingFromPetLogIn">Local's Address</p>
					<div className="input_filed">
						<input type="text" name="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required />
					</div>
                    
					<GeolocationComponent address={address} onLocationFetched={handleCoordinatesFetched} />

					<p className="writingFromPetLogIn">Upload an image of a valid official document.</p>
					<ImageUpload setImageSrc={setDocumentImage} imageSrc={documentImage} onImageUpload={handleImageUpload} />

					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default SideBarAdd;

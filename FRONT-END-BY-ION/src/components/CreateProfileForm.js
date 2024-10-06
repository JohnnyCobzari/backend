import React, { useState } from "react";
import ImageUpload from "./DragAndDrop";
import "../styles/LogInPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import myString from "./DefaultImage";
import SearchLogic from "./Recomandations/Dogs";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import default styles
import GeolocationComponent from "./Geolocation"; // Import the geolocation logic
import VaccinationForm from "./VaccinationForm";

const PetForm = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [imageSrc, setImageSrc] = useState(myString);
	const [error, setError] = useState("");
	const [coordinates, setCoordinates] = useState(null); // State to store fetched coordinates
	const [latitude, setLatitude] = useState(null); // Latitude
	const [longitude, setLongitude] = useState(null); // Longitude
    const [vaccines, setVaccines] = useState([]); // Pentru vaccine

    console.log(vaccines);

	const [formData, setFormData] = useState({
		petName: "",
		gender: "",
		breed: "",
		age: "",
		ownerName: "",
		ownerPhone: "",
		vaccinated: "",
		allergies: "",
		vetInfo: "",
		readyForBreeding: false,
		breedingPrice: "",
		address: "", // New field for pet's address
		image: "",
	});

	const navigate = useNavigate();

	const handlePhoneChange = (value) => {
		setFormData((prevData) => ({
			...prevData,
			ownerPhone: value,
		}));
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));

		if (name === "breed") {
			setQuery(value);
		}
	};

	// Function to handle the coordinates fetched from GeolocationComponent
	const handleCoordinatesFetched = (lat, lng) => {
		setLatitude(lat);
		setLongitude(lng);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updatedFormData = {
			...formData,
			image: imageSrc,
            vaccines: vaccines,
			latitude, // Include latitude separately
			longitude, // Include longitude separately
		};
		const user = localStorage.getItem("userId");
        console.log(updatedFormData);

		try {
			const response = await axios.post(`http://localhost:3002/pets?userId=${user}`, updatedFormData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				console.log("Pet profile created successfully!");
				navigate("/HomePage");
			} else {
				setError("Failed to create pet profile.");
			}
		} catch (error) {
			console.error("Error creating pet profile:", error);
			setError("Failed to create pet profile.");
		}
	};

	return (
		<form id="login-form" onSubmit={handleSubmit}>
			{/* Existing form fields */}
			<p className="writingFromPetLogIn">Pet name</p>
			<div className="input_filed">
				<input type="text" name="petName" value={formData.petName} placeholder="ex: Bobby" onChange={handleChange} required />
			</div>

			{/* Gender Input */}
			<p className="writingFromPetLogIn">Gender</p>
			<div className="input_filed">
				<select name="gender" value={formData.gender} onChange={handleChange} required>
					<option value="" disabled>
						Tap to select
					</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
			</div>

			<p className="writingFromPetLogIn">Breed</p>
			<div className="input_filed">
				<input type="text" name="breed" value={formData.breed} placeholder="ex: Brodiaga po jizni simpotiaga" onChange={handleChange} required />
			</div>
			<SearchLogic query={query} onResults={setResults} />
			<div
				id="suggestions"
				style={{
					transform: "translateY(-10px)",
					border: "1px solid #ddd",
					maxHeight: "136px",
					overflowY: "hidden",
					transition: "background-color 0.3s ease",
					borderRadius: "10px",
				}}
			>
				{results.map((result, index) => (
					<div
						key={index}
						style={{
							padding: "10px",
							cursor: "pointer",
							backgroundColor: "#fff",
							color: "#6b5e49",
							borderBottom: "1px solid #ddd",
						}}
						onClick={() => {
							setFormData((prevData) => ({
								...prevData,
								["breed"]: result,
							}));
							setResults([]);
						}}
					>
						{result}
					</div>
				))}
			</div>

			<p className="writingFromPetLogIn">Age (months)</p>
			<div className="input_filed">
				<input type="number" name="age" value={formData.age} placeholder="ex: 1 year and 6 months" onChange={handleChange} required />
			</div>

			<p className="writingFromPetLogIn">Owner name</p>
			<div className="input_filed">
				<input type="text" name="ownerName" value={formData.ownerName} placeholder="John" onChange={handleChange} required />
			</div>

			<p className="writingFromPetLogIn">Owner Phone Number</p>
			<div className="input_filed">
				<PhoneInput name="ownerPhone" value={formData.ownerPhone} placeholder="ex: +373 079 000 000" onChange={handlePhoneChange} required />
			</div>
{/*======================================vaccines=====================================================*/}

            <VaccinationForm setVaccines={setVaccines} vaccines={vaccines}/>

{/*======================================vaccines=====================================================*/}


			<p className="writingFromPetLogIn">Allergies</p>
			<div className="input_filed">
				<input type="text" name="allergies" value={formData.allergies} placeholder="Ex: None" onChange={handleChange} required />
			</div>

			<p className="writingFromPetLogIn">Veterinarian information</p>
			<div className="input_filed">
				<input type="text" name="vetInfo" value={formData.vetInfo} placeholder="Ex: Name and Address" onChange={handleChange} required />
			</div>

			{/* Moved Address Field */}
			<p className="writingFromPetLogIn">Your Pet's Address</p>
			<div className="input_filed">
				<input type="text" name="address" value={formData.address} placeholder="Enter your pet's address" onChange={handleChange} onBlur={() => setCoordinates(formData.address)} required />
			</div>

			<GeolocationComponent address={formData.address} onLocationFetched={handleCoordinatesFetched} />

			{/* "Ready for Breeding" Section */}
			<div id="ReadyForBeeding">
				<p>Ready for breeding?</p>
				<input type="checkbox" id="checkbox" name="readyForBreeding" checked={formData.readyForBreeding} onChange={handleChange} />
			</div>

			{formData.readyForBreeding && (
				<>
					<p className="writingFromPetLogIn">Breeding Price</p>
					<div className="input_filed">
						<input type="number" name="breedingPrice" value={formData.breedingPrice} placeholder="ex: 150" onChange={handleChange} />
					</div>
				</>
			)}



			<ImageUpload setImageSrc={setImageSrc} imageSrc={imageSrc} />

			<button type="submit" className="login">
				Create Pet Profile
			</button>
		</form>
	);
};

export default PetForm;

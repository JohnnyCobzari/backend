import React, { useState } from "react";
import "../styles/LogInPage.css";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/DragAndDrop";
import MultipleImageUpload from "./ServicesComponets/MultipleFileUpload";
import axios from "axios";

const api = axios.create({
	baseURL: 'http://localhost:3002', // Your backend URL
	headers: {
	  'Content-Type': 'application/json',
	  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
	}
  });
  
  // Function to set the token in headers
  export const setAuthToken = (token) => {
	if (token) {
	  api.defaults.headers['Authorization'] = `Bearer ${token}`;
	} else {
	  delete api.defaults.headers['Authorization'];
	}
  };

function ServiceSignUp() {
	const navigate = useNavigate();

	// State for form fields
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		repeatPassword: "",
		companyDirector: "",
		documentImageUrl: "",
		userPhotoUrls: [],
		role: "local"
	});

	const [error, setError] = useState("");
	const [submittedData, setSubmittedData] = useState(null); // State to display submitted data

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleDocUpload = (newImageUrl) => {
		setFormData((prevData) => ({ ...prevData, documentImageUrl: newImageUrl }));
	};

	const handleUserUpload = (newImageUrls) => {
		setFormData((prevData) => ({ ...prevData, userPhotoUrls: newImageUrls[0] }));
	};

	
  

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent page reload

		// Validate if passwords match
		if (formData.password !== formData.repeatPassword) {
			setError("Passwords do not match!");
			return;
		}

		// Display submitted data
		setSubmittedData(formData);
		setError(""); // Clear error message

		axios.post('http://localhost:3002/auth/local-signUp', formData)
	  .then((response) => {
		const { token, userId } = response.data;
		localStorage.setItem('authToken', token);
		localStorage.setItem('userId', userId);
  
		// Update Axios default headers
		setAuthToken(token);
  
		   setFormData({
      email: "",
      password: "",
      repeatPassword: "",
      companyDirector: "",
      documentImageUrl: "",
      userPhotoUrls: [],
    });
		// go to the home page
		navigate('/HomePage'); //<============================================
	  })
	  .catch((err) => {
		// Check if the error has a response and a message
		if (err.response.data.message) {
		  console.log('Error message from backend:', err.response.data.message); // Check in the console
		  setError(err.response.data.message);  // Set the backend message as the error
		} else {
		  setError("An error occurred while logging in.");  // Fallback message
		}
	  });
	
	};

	return (
		<div>
			<Logo />
			<div className="uperContainerForImagesPage2">
				<img src="images/LogInDog.png" className="logInPet" alt="LogIn Dog" />
				<img src="./Admin_services_foto/Welcome to our pet care community!.png" id="welcome" alt="Welcome" />
				<img src="images/logInCat.png" className="logInPet" alt="LogIn Cat" />
			</div>

			<form id="login-form" onSubmit={handleSubmit}>
				<p className="emailAndpasword">Email</p>
				<div className="input_filed">
					<input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
				</div>

				<p className="emailAndpasword">Password</p>
				<div className="input_filed">
					<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
				</div>

				<p className="emailAndpasword">Repeat Password</p>
				<div className="input_filed">
					<input type="password" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleChange} required />
				</div>

				<p className="emailAndpasword">Company Director's Name</p>
				<div className="input_filed">
					<input type="text" name="companyDirector" placeholder="Company Director's Name" value={formData.companyDirector} onChange={handleChange} required autoComplete="off" />
				</div>

				<p className="emailAndpasword" style={{ fontSize: "16px" }}>
					Upload a photo to verify your pet service
				</p>
				<ImageUpload setImageSrc={handleDocUpload} imageSrc={formData.documentImageUrl} label="Document" />

				<p className="emailAndpasword" style={{ fontSize: "16px" }}>
					Upload a photo with you
				</p>
				<MultipleImageUpload onImagesUpload={handleUserUpload} label="User" />

				{error && <p className="error-message">{error}</p>}

				<button type="submit" className="login">
					Sign Up for pet service account
				</button>
				<p className="paragraf">
					Already have an account?{" "}
					<a href="LogIn" className="sign-up">
						Log In
					</a>
				</p>
			</form>

			<div className="FooterImageBoxPage2">
				<img src="images/LogInUnder.png" alt="Footer Image" />
			</div>
			<Footer />
		</div>
	);
}

export default ServiceSignUp;

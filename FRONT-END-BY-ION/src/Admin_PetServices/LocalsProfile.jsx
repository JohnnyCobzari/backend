import Header from "../components/Header";
import Footer from "../components/Footer";
import "../Admin_PetServices/ServicesComponets/LocalProfile.css";
import ImageCarousel from "./ServicesComponets/ImageCarusel";
import StarRating from "./ServicesComponets/StarRating";
import { PiMapPinAreaBold } from "react-icons/pi";
import ReviewsBox from "./ServicesComponets/ReveiwsBox";
import LoadingAnimation from "../components/LoadingAnimation";

import { useEffect, useState } from "react";
import axios from "axios";

function LocalProfile() {
	const [localInfo, setLocals] = useState({}); // Initialize as an empty object
	const [showReviews, setShowReviews] = useState(false);
    const userLocals = JSON.parse(localStorage.getItem('locals')) || [];

	useEffect(() => {
		const currentUrl = window.location.href; // Get the full URL
		const localId = currentUrl.split("/").pop(); // Get the last part after the final slash

		console.log(localId); // Log the ID to verify

		// Fetch data from the server
		axios
			.get(`http://localhost:3002/local/one-local/${localId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setLocals(response.data); // Set the fetched local info to state
				console.log(response.data); // Log the response data
			})
			.catch((error) => console.error("Error fetching local info:", error));
	}, []); // Add an empty dependency array to only run once

    console.log("debug", userLocals)
	const isLocalInUserLocals = userLocals.some((local) => local._id === localInfo._id);


 	if (!localInfo || Object.keys(localInfo).length === 0) {
		return (
			<div>
				<LoadingAnimation />
			</div>
		);
	}

	return (
		<>
			<Header />
			<div className="carouselContainer">{localInfo.images && <ImageCarousel images={localInfo.images} />}</div>
			{!showReviews ? (
				<>
					<div className="localProfileInfo">
						<div className="localNameContainer">
							<div></div>
							<h2>{localInfo.localName}</h2>
							<div></div>
						</div>
						<p className="TypeLocalWriting">General information:</p>
						<p className="info">{localInfo.localInfo}</p>
						<div className="AddressContainer">
							<p className="TypeLocalWriting">Address:</p>
							<p className="address">{localInfo.address}</p>
							<PiMapPinAreaBold />
						</div>
						<StarRating rating={localInfo.rating || 0} />
						<div className="LocalButtonsBox">
							<button className="LocalInformationButton" onClick={() => setShowReviews(false)}>
								Information
							</button>
							<div></div>
							<button className="LocalReviewButton" onClick={() => setShowReviews(true)}>
								Reviews
							</button>
						</div>
					</div>
				</>
			) : (
				<ReviewsBox setShowReviews={setShowReviews} isLocalInUserLocals={isLocalInUserLocals} />
			)}
			<Footer />
		</>
	);
}

export default LocalProfile;

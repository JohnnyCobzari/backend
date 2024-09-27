import Header from "../components/Header";
import Footer from "../components/Footer";
import "../Admin_PetServices/ServicesComponets/LocalProfile.css";
import ImageCarousel from "./ServicesComponets/ImageCarusel";
import StarRating from "./ServicesComponets/StarRating";
import { PiMapPinAreaBold } from "react-icons/pi";
import ReviewsBox from "./ServicesComponets/ReveiwsBox";


import { useEffect, useState } from "react";
import axios from 'axios';

function LocalProfile() {
  

  const [localInfo, setLocals]= useState();
  useEffect(() => {
		

		const currentUrl = window.location.href; // Get the full URL
const localId = currentUrl.split("/").pop(); // Get the last part after the final slash

console.log(localId);

		
			const response =axios.get(`http://localhost:3002/local/one-local/${localId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					"Content-Type": "application/json",
				},
			})
			.then(response => {
                setLocals(response.data);
				console.log(localInfo);
            })
            .catch(error => console.error('Error fetching notifications:', error));;

            console.log(localInfo);
	});

	const images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZAhZTmV7ezdrDYE73Kiy0mwGx3Zhwvagf3g&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5WKKj_Y8od_BJFvoLDKlz50BBGd2i1sH03wGY8jFIKmeKyIzdEnSLUjqmCF_nVqYMBw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYwGZzpqc8SDDerpr-LEqReJ_QqRgBVxEVUuOt9XbOfd71jk4vZBDQCgu5v8aNJGLo7Ao&usqp=CAU", "https://c8.alamy.com/comp/2RD1H9J/pet-shop-building-line-concept-2RD1H9J.jpg"];

	return (
		<>
			<Header />
			<div className="carouselContainer">
				<ImageCarousel images={images} />{" "}
			</div>
			<div className="localProfileInfo">
				<div className="localNameCOntainer">
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
				<StarRating rating={0} />
                <div className="LocalButtonsBox">
                    <button className="LocalInformationButton">Information</button>
                    <div></div>
                    <button className="LocalReviewBUtton">Reviews</button>
                </div>
			</div>
            <ReviewsBox/>
			<Footer />
		</>
	);
}

export default LocalProfile;

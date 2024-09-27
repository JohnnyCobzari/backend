import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarusel from "./ServicesComponets/ImageCarusel";
import "../Admin_PetServices/ServicesComponets/LocalProfile.css";
import StarRating from "./ServicesComponets/StarRating";
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

  return (
    <>
      <Header />
      <div className="carouselContainer">
        <ImageCarusel images={localInfo.images} />
      </div>
      <div className="localProfileInfo">
        <h2>{localInfo.localName}</h2>
        <h3 className="localType">{localInfo.localType}</h3>
        <p className="address">{localInfo.address}</p>
        <p className="info">{localInfo.localInfo}</p>
        <StarRating rating={0}/>
      </div>
      <Footer />
    </>
  );
}

export default LocalProfile;

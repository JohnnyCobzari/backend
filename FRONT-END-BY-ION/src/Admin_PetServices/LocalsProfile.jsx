import Header from "../components/Header";
import Footer from "../components/Footer";
import "../Admin_PetServices/ServicesComponets/LocalProfile.css";
import ImageCarousel from "./ServicesComponets/ImageCarusel";
import StarRating from "./ServicesComponets/StarRating";
import { PiMapPinAreaBold } from "react-icons/pi";
import ReviewsBox from "./ServicesComponets/ReveiwsBox";

function LocalProfile() {
	const localInfo = {
		address: "strada albisoara",
		localInfo: "loren ispusdn valsdnvaslkj vasfivn asdflk dsklfj sdjfk fjkl",
		localName: "bigShop",
		localType: "Pet Shop",
		userId: "66e1c4efb15fa60cdd025907",
	};

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

import React, { useState } from "react";

// Componenta AddReviewCurtain cu gestionarea inputului
const AddReviewCurtain = ({ toggleCurtain, submitReview}) => {
	const [reviewText, setReviewText] = useState("");

	const handleTextChange = (e) => {
		setReviewText(e.target.value);
	};

	const handleSubmit = () => {
		submitReview(reviewText); // Trimite textul recenziei către ReviewsBox
		toggleCurtain(); // Închide cortina
	};

	return (
		<div className="addReviewCurtain open">
			<div className="curtainContent">
				<h2>Add Your Review</h2>
				<textarea placeholder="Write your review here..." value={reviewText} onChange={handleTextChange}></textarea>
				<button onClick={handleSubmit}>Submit Review</button>
			</div>
		</div>
	);
};

const ReviewsBox = ({setShowReviews, isLocalInUserLocals}) => {
	const [isCurtainOpen, setIsCurtainOpen] = useState(false);

	const toggleCurtain = () => {
		setIsCurtainOpen(!isCurtainOpen);
	};

	// Funcția care primește textul recenziei și îl afișează în consolă
	const submitReview = (reviewText) => {
		console.log("Review Submitted:", reviewText);
	};

	const reviews = [
		{ id: 1, review: "Great service!", rating: 5 },
		{ id: 2, review: "Nice experience!", rating: 4 },
	];

	return (
		<div className="localProfileInfo">
			<div className="localNameContainer">
				<div></div>
				<h2>Reviews</h2>
				<div></div>
			</div>

			{!isLocalInUserLocals && (<div className="addReviewContainer">
				<button className="addReviewButton" onClick={toggleCurtain}>
					Add Review
				</button>
			</div>)}

			{/* Reviews list */}
			<div className="reviewsList">
				{reviews.map((review) => (
					<div key={review.id} className="reviewItem">
						<p>{review.review}</p>
						<p>Rating: {review.rating}/5</p>
					</div>
				))}
			</div>

			<div className="LocalButtonsBox">
				<button className="LocalInformationButton" onClick={() => setShowReviews(false)}>
					Information
				</button>
				<div></div>
				<button className="LocalReviewButton" onClick={() => setShowReviews(true)}>
					Reviews
				</button>
			</div>

			{/* Curtain for adding reviews */}
			{isCurtainOpen && <AddReviewCurtain toggleCurtain={toggleCurtain} submitReview={submitReview} />}
		</div>
	);
};

export default ReviewsBox;

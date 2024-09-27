import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import './LocalProfile.css'



// Componenta AddReviewCurtain cu gestionarea inputului
const AddReviewCurtain = ({ toggleCurtain, submitReview }) => {
  const [reviewMessage, setReviewText] = useState('');
  const [rating, setRating] = useState();
  const [hover, setHover] = useState(null);

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = () => {

    const userId = localStorage.getItem("userId");
    const currentUrl = window.location.href; // Get the full URL
    const localId = currentUrl.split("/").pop();
		// Create an object with form data
		const reviewForm = {
			userId,
      localId,
			reviewMessage,
      rating: Number(rating)
		};
    console.log(reviewForm)
		
			 axios.post(`http://localhost:3002/local/create-review`, reviewForm, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					"Content-Type": "application/json",
				},
			})
      .then(response => {
        console.log('am trmis request')
      console.log(response);
    })
    .catch(error => console.error('Error fetcHING REVIEWS:', error));;

		
    submitReview(reviewMessage); // Trimite textul recenziei către ReviewsBox
    toggleCurtain();
    
    
    // Închide cortina
  };


  return (
    <div className="addReviewCurtain open">
      <div className="curtainContent">
        <h2>Add Your Review</h2>

        {/* Star rating system */}
        <div className="star-rating2">
          {/* Check if the array renders 5 stars */}
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  style={{ display: "none" }}
                />
                <FaStar
                  className="star2"
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer" }}
                />
              </label>
            );
          })}
        </div>

        {/* Review textarea */}
        <textarea
          placeholder="Write your review here..."
          value={reviewMessage}
          onChange={handleTextChange}
        ></textarea>

        {/* Submit button */}
        <button onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

const ReviewsBox = () => {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  const toggleCurtain = () => {
    setIsCurtainOpen(!isCurtainOpen);
  };

  // Funcția care primește textul recenziei și îl afișează în consolă
  const submitReview = (reviewText) => {
    console.log('Review Submitted:', reviewText);
  };
  const [reviews, setReviews] = useState([]);
  
	useEffect(() => {
		

    const currentUrl = window.location.href; // Get the full URL
    const localId = currentUrl.split("/").pop();

		
			axios.get(`http://localhost:3002/local/all-reviews/${localId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					"Content-Type": "application/json",
				},
			})
			.then(response => {
                setReviews(response.data);
				console.log(reviews);
            })
            .catch(error => console.error('Error fetching notifications:', error));;
	}, []);






  return (
    <div className="localProfileInfo">
      <div className="localNameContainer">
        <div></div>
        <h2>Reviews</h2>
        <div></div>
      </div>

      {/* Add Review button */}
      <div className="addReviewContainer">
        <button className="addReviewButton" onClick={toggleCurtain}>
          Add Review
        </button>
      </div>

      {/* Reviews list */}
      <div className="reviewsList">
        {reviews.map((review) => (
          <div key={review._id} className="reviewItem">
            <p>{review.reviewMessage}</p>
            <p>Rating: {review.rating}/5</p>
          </div>
        ))}
      </div>

      <div className="LocalButtonsBox">
        <button className="LocalInformationButton">Information</button>
        <div></div>
        <button className="LocalReviewButton">Reviews</button>
      </div>

      {/* Curtain for adding reviews */}
      {isCurtainOpen && (
        <AddReviewCurtain toggleCurtain={toggleCurtain} submitReview={submitReview} />
      )}
    </div>
  );
};

export default ReviewsBox;

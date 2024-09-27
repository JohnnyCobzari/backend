import React from 'react';
import './StarRating.css'; // Ensure you have the CSS styles

const StarRating = ({ rating }) => {
  const totalStars = 5;

  const getStarWidth = (index) => {
    if (index < Math.floor(rating)) {
      return 100; // Fully filled
    } else if (index === Math.floor(rating) && rating % 1 !== 0) {
      return (rating % 1) * 100; // Partially filled
    }
    return 0; // Not filled
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <div className="star-container" key={index}>
          <span className="star">★</span>
          <div
            className="star-fill"
            style={{ width: `${getStarWidth(index)}%` }}
          />
        </div>
      ))}
      <div className="rating-value">{rating.toFixed(1)} / {totalStars}</div>
    </div>
  );
};

export default StarRating;

import React, { useState, useEffect } from 'react';
import "./LocalProfile.css"

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const handlePrevClick = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsSliding(false);
    }, 500);
  };

  const handleNextClick = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setIsSliding(false);
    }, 500);
  };

  const handleThumbClick = (index) => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsSliding(false);
    }, 500);
  };

  const getAdjacentIndex = (offset) => {
    const newIndex = currentIndex + offset;
    return (newIndex + images.length) % images.length;
  };

  return (
    <div className="carousel-container_img">
      <div className={`carousel_img ${isSliding ? 'sliding_img' : ''}`}>
        <button className="prev_img" onClick={handlePrevClick}>
          &#10094;
        </button>
        <div className="image-wrapper_img">
          <img
            className="adjacent-img_img left_img"
            src={images[getAdjacentIndex(-1)]}
            alt="Previous Slide"
          />
          <img
            className={`main-img_img ${isSliding ? 'sliding_img' : ''}`}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
          />
          <img
            className="adjacent-img_img right_img"
            src={images[getAdjacentIndex(1)]}
            alt="Next Slide"
          />
        </div>
        <button className="next_img" onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
      <div className="thumbnail-container_img">
        {images.map((image, index) => (
          <img
            key={index}
            className={`thumbnail_img ${index === currentIndex ? 'active_img' : ''}`}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;

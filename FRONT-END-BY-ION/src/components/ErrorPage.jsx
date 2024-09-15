import React from 'react';
import "../styles/ErrorPage.css";
const ErrorPage = () => {
    return (
        <div className="error-container">
            <img src="https://st2.depositphotos.com/3830375/5405/i/450/depositphotos_54050241-stock-photo-chihuahua-sad-dog-at-the.jpg" alt="Sad Pet" className="pet-image-NoRepeatPlz" />
            <h1 className="error-title">Oops! Something Went Wrong</h1>
            <p className="error-message">We couldn't find the page you're looking for. But don't worry, our pets are here to help!</p>
        </div>
    );
};

export default ErrorPage;

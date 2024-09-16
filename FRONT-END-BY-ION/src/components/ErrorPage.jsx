import React from 'react';
import "../styles/ErrorPage.css";

const ErrorPage = () => {
    return (
        <div className="error-container">
            <img src="./images/ErrorPagePet.jpg" alt="Sad Pet" className="pet-image-NoRepeatPlz" />
            <h1 className="error-title">Oops! Something Went Wrong</h1>
            <p className="error-message">We couldn't find the page you're looking for. But don't worry, our pets are here to help!</p>
        </div>
    );
};

export default ErrorPage;

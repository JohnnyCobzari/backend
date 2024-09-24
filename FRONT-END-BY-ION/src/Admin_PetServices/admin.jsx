import Logo from "../components/Logo";
import "../styles/AdminPage.css";
import { FaTrash, FaCheck } from "react-icons/fa";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function PetItem({ item, onDelete, onApprove }) {
    return (
        <li style={styles.listItem}>
            {item}
            <div style={styles.buttonContainer}>
                <button onClick={() => onApprove(item)} style={styles.button}>
                    <FaCheck />
                </button>
                <button onClick={() => onDelete(item)} style={styles.button}>
                    <FaTrash /> 
                </button>
            </div>
        </li>
    );
}

const styles = {
    listItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderRadius: "5px",
        margin: "5px 0",
        backgroundColor: "#dad5cd",
    },
    buttonContainer: {
        display: "flex",
        gap: "10px",
    },
    button: {
        border: "none",
        backgroundColor: "#6b5e49",
        color: "white",
        padding: "5px 10px",
        borderRadius: "3px",
        cursor: "pointer",
    },
};

function Admin() {
    
    const [petShops, setPetShops] = useState([]);
    const [shopCertificates, setShopCertificates] = useState([]);
    const [userNotifications, setUserNotifications] = useState([]);

    

     // Fetch data from the server using Axios
     useEffect(() => {
        // Fetch pending pet shops
        axios.get("http://localhost:3002/admin/waiting-list-add")
            .then(response => {
                console.log('Pet Shops:', response.data);  // Afișează datele primite în consolă
                setPetShops(response.data);
            })
            .catch(error => console.error('Error fetching pet shops:', error));

        // Fetch pending certificates
        axios.get('http://localhost:3002/admin/waiting-list')
            .then(response => {
                console.log('Certificates:', response.data);  // Afișează datele primite în consolă
                setShopCertificates(response.data);
            })
            .catch(error => console.error('Error fetching certificates:', error));
    }, []);

    const handleDeleteShop = (shop) => {
        setPetShops(petShops.filter(item => item !== shop));
    };

    const handleDeleteCertificate = (certificate) => {
        setShopCertificates(shopCertificates.filter(item => item !== certificate));
    };

    const handleDeleteNotification = (notification) => {
        setUserNotifications(userNotifications.filter(item => item !== notification));
    };

    const handleApprove = (item) => {
        alert(`${item} approved!`); // Aici poți adăuga logica de aprobat
    };

    return (
        <>
            <Logo />
            <div className="Admin_Container">
                <div className="Pet_Services">
                    <h2>Pet Services request</h2>
                    <ul>
                        {petShops.map((shop, index) => (
                            <PetItem
                                key={index}
                                item={shop}
                                onDelete={handleDeleteShop}
                                onApprove={handleApprove}
                            />
                        ))}
                    </ul>
                </div>
                <div className="NewUser_AdminApprove">
                    <h2>New user request</h2>
                    <ul>
                        {shopCertificates.map((certificate, index) => (
                            <PetItem
                                key={index}
                                item={certificate}
                                onDelete={handleDeleteCertificate}
                                onApprove={handleApprove}
                            />
                        ))}
                    </ul>
                </div>
                <div className="Admin_Notification">
                    <h2>User Notifications</h2>
                    <ul>
                        {userNotifications.map((notification, index) => (
                            <PetItem
                                key={index}
                                item={notification}
                                onDelete={handleDeleteNotification}
                                onApprove={handleApprove}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Admin;

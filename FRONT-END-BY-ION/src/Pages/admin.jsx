import Logo from "../components/Logo";
import "../styles/AdminPage.css";
import React, { useState } from 'react';
import { FaTrash, FaCheck } from "react-icons/fa";

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
    const [petShops, setPetShops] = useState([
        "Happy Paws Pet Store",
        "Purrfect Pets Supplies",
        "Furry Friends Market",
        "The Pet Palace",
        "Tail Waggers Pet Emporium"
    ]);

    const [shopCertificates, setShopCertificates] = useState([
        "Certified Pet Care Excellence",
        "Animal Welfare Compliance",
        "Veterinary Health Standards",
        "Pet Product Safety Certification",
        "Ethical Pet Business Accreditation"
    ]);

    const [userNotifications, setUserNotifications] = useState([
        "Your pet grooming appointment is confirmed for tomorrow at 10 AM.",
        "New vaccination reminder for Bella: Rabies shot due on October 1st.",
        "Your order of pet food has been shipped and will arrive in 3 days.",
        "Your review for Furry Friends Market has been approved.",
        "Special offer: Get 20% off on all pet accessories this weekend!"
    ]);

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
                    <h2>Notifications</h2>
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

import Logo from "../components/Logo";
import "../styles/AdminPage.css";
import { FaTrash, FaCheck } from "react-icons/fa";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Capitalized component names
function NewUserItem({ item, onDelete, onApprove }) {
    return (
        <li style={styles.listItem}>
            <div>
                <p><strong>Company Director:</strong> {item.companyDirector}</p>
                <p><strong>Email:</strong> {item.email}</p>
                {item.documentImageUrl && (
                    <p><strong>Document Image:</strong> <img src={item.documentImageUrl} alt="Document" width={100} /></p>
                )}
                {item.userPhotoUrls && item.userPhotoUrls.length > 0 && (
                    <div>
                        <p><strong>User Photos:</strong></p>
                        {item.userPhotoUrls.map((url, index) => (
                            <img key={index} src={url} alt={`User Photo ${index + 1}`} width={100} />
                        ))}
                    </div>
                )}
                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {item.status || 'Pending'}</p>
            </div>
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

function NewLocalItem({ item, onDelete, onApprove }) {
    return (
        <li style={styles.listItem}>
            <div>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Information:</strong> {item.information}</p>
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Coordinates:</strong> {item.latitude}, {item.longitude}</p>
                
                <p><strong>Profile Image:</strong></p>
                <img src={item.profileImage} alt={`${item.name}'s profile`} style={styles.image} />
                
                {item.images && item.images.length > 0 && (
                    <div>
                        <p><strong>Images:</strong></p>
                        <div style={styles.imageContainer}>
                            {item.images.map((img, index) => (
                                <img key={index} src={img} alt={`Additional image ${index + 1}`} style={styles.additionalImage} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
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

function NewNotificationItem({ item, onDelete, onApprove }) {
    return (
        <li style={styles.listItem}>
            <div>
                <p><strong>Message:</strong> {item.message}</p>
                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {item.status}</p>
            </div>
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
        const authToken = localStorage.getItem('authToken');

        // Set up headers with Authorization token
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        // Fetch pending pet shops with authorization token
        axios.get("http://localhost:3002/admin/waiting-list-add", config)
            .then(response => {
                console.log('Pet Shops:', response.data);
                setPetShops(response.data);
            })
            .catch(error => console.error('Error fetching pet shops:', error));

        // Fetch pending certificates with authorization token
        axios.get('http://localhost:3002/admin/waiting-list', config)
            .then(response => {
                console.log('New local owners:', response.data);
                setShopCertificates(response.data);
            })
            .catch(error => console.error('Error fetching certificates:', error));

        // Fetch notifications with authorization token
        axios.get('http://localhost:3002/admin/waiting-list-notification', config)
            .then(response => {
                console.log('New Send Notifications:', response.data);
                setUserNotifications(response.data);
            })
            .catch(error => console.error('Error fetching notifications:', error));
    }, []);

    const handleDeleteShop = (shop) => {
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };
    
        // Make the API call to delete the shop using its ID
        axios.post(`http://localhost:3002/admin/reject-add/${shop._id}`,{}, config)
            .then(response => {
                // Update the state to remove the deleted shop
                setPetShops(petShops.filter(item => item !== shop));
            })
            .catch(error => {
                console.error('Error deleting shop:', error);
                // Optionally handle error, e.g., show a notification or message in the UI
            });
    };
    
    const handleDeleteCertificate = (certificate) => {
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };
    
        // Make the API call to delete the certificate using its ID
        axios.post(`http://localhost:3002/admin/reject/${certificate._id}`,{}, config)
            .then(response => {
                // Update the state to remove the deleted certificate
                setShopCertificates(shopCertificates.filter(item => item !== certificate));
            })
            .catch(error => {
                console.error('Error deleting certificate:', error);
                // Optionally handle error, e.g., show a notification or message in the UI
            });
    };
    
    const handleDeleteNotification = (notification) => {
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };
    
        // Make the API call to delete the notification using its ID
        axios.post(`http://localhost:3002/admin/reject-notification/${notification._id}`,{}, config)
            .then(response => {
                // Update the state to remove the deleted notification
                setUserNotifications(userNotifications.filter(item => item !== notification));
            })
            .catch(error => {
                console.error('Error deleting notification:', error);
                // Optionally handle error, e.g., show a notification or message in the UI
            });
    };
    
    const handleApproveShop = (shop) => {
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            
        };
    
        // Make the API call to approve the shop using its ID
        axios.post(`http://localhost:3002/admin/approve-add/${shop._id}`,{}, config)
            .then(response => {
                // Optionally, update the state to remove the approved shop
                setPetShops(petShops.filter(item => item !== shop));
               
            })
            .catch(error => {
                console.error('Error approving shop:', error);
                
            });
    };
    
    const handleApproveCertificate = (certificate) => {
        const authToken = localStorage.getItem('authToken');
        console.log(authToken);
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        };
        
    console.log('Authorization Token:', authToken); // Log the token
    
    
        // Make the API call to approve the certificate using its ID
        axios.post(`http://localhost:3002/admin/approve/${certificate._id}`,{},config)
            .then(response => {
                // Optionally, update the state to remove the approved certificate
                setShopCertificates(shopCertificates.filter(item => item !== certificate));
               
            })
            .catch(error => {
                console.log(config);
                console.log(authToken);
                console.error('Error approving certificate:', error);
             
            });
    };
    
    const handleApproveNotification = (notification) => {
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };
    
        // Make the API call to approve the notification using its ID
        axios.post(`http://localhost:3002/admin/approve-notification/${notification._id}`,{}, config)
            .then(response => {
                // Optionally, update the state to remove the approved notification
                setUserNotifications(userNotifications.filter(item => item !== notification));
              
            })
            .catch(error => {
                console.error('Error approving notification:', error);
                
            });
    };

    return (
        <>
            <Logo />
            <div className="Admin_Container">
                <div className="Pet_Services">
                    <h2>Pet Services request</h2>
                    <ul>
                        {shopCertificates.map((shop) => (
                            <NewUserItem
                                key={shop._id} // Use unique identifier if available
                                item={shop}
                                onDelete={handleDeleteCertificate}
                                onApprove={handleApproveCertificate}
                            />
                        ))}
                    </ul>
                </div>
                <div className="NewUser_AdminApprove">
                    <h2>New user request</h2>
                    <ul>
                        {petShops.map((certificate) => (
                            <NewLocalItem
                                key={certificate._id} // Use unique identifier if available
                                item={certificate}
                                onDelete={handleDeleteShop}
                                onApprove={handleApproveShop}
                            />
                        ))}
                    </ul>
                </div>
                <div className="Admin_Notification">
                    <h2>User Notifications</h2>
                    <ul>
                        {userNotifications.map((notification) => (
                            <NewNotificationItem
                                key={notification._id} // Use unique identifier if available
                                item={notification}
                                onDelete={handleDeleteNotification}
                                onApprove={handleApproveNotification}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Admin;

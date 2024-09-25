import React, { useState, useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import "../styles/NotificationIcon.css"; // Styles

// Utility functions to get token and user ID from localStorage
const getToken = () => localStorage.getItem('authToken');
const getUserId = () => localStorage.getItem('userId');

const NotificationIcon = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const API_BASE_URL = 'http://localhost:3002';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notifications`, {
          params: { userId: getUserId() },
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        // Log the fetched data for debugging
        console.log("Fetched notifications:", response.data.notifications || response.data);

        // Normalize notifications to ensure each has an 'id'
        const fetchedNotifications = response.data.notifications || response.data;
        const processedNotifications = fetchedNotifications.map((notification) => {
          // Handle cases where the backend uses '_id' instead of 'id'
          if (!notification.id && notification._id) {
            return { ...notification, id: notification._id };
          }
          return notification;
        });

        setNotifications(processedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        alert("Failed to fetch notifications. Please try again later.");
      }
    };

    fetchNotifications();
  }, []);

  // Function to delete a notification
  const handleDeleteNotification = async (notificationId) => {
    if (!notificationId) {
      console.error("No notification ID provided for deletion.");
      alert("Invalid notification ID.");
      return;
    }

    try {
      console.log("Attempting to delete notification with ID:", notificationId);

      const response = await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      console.log("Delete response:", response.data);

      // Remove the deleted notification from state
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );

    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error deleting notification:", error.response.status);
        console.error("Error data:", error.response.data);


      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
 
      } else {
        // Something else happened
        console.error("Error setting up request:", error.message);

      }
    }
  };

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notification-icon-container">
      <div
        className="icon-wrapper"
        onClick={() => {
          setShowNotifications(!showNotifications);
          markAllAsRead();
        }}
      >
        <IoMdNotifications size={24} className="notification-icon" />
        {/* Afișează numărul de notificări necitite, dacă există */}

        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </div>

      {showNotifications && (
        <div className="notification-popup">
          <h4>Notifications</h4>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id} // Ensure unique key
                  className={`notification-item ${notification.read ? "read" : "unread"}`}
                >
                  {notification.text || notification.message} {/* Adjust based on the field */}
                  <FaTimes
                    className="delete-icon"
                    onClick={() => handleDeleteNotification(notification.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;

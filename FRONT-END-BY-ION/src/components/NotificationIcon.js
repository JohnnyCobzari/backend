import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io"; // Importă iconul de notificări
import { FaTimes } from "react-icons/fa"; // Iconița de ștergere
import "../styles/NotificationIcon.css"; // Stilurile pentru iconiță

const NotificationIcon = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    { text: "Notificare 2: O nouă potrivire pentru animalul tău!", read: false },
    { text: "Notificare 3: Întâlnire programată mâine la 15:00!", read: false },
]);


   // Funcția de ștergere a notificărilor
   const handleDeleteNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setShowNotifications(updatedNotifications);
  };

  // Numărul de notificări necitite
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
      <div className="icon-wrapper" onClick={() => {
          setShowNotifications(!showNotifications);
          markAllAsRead(); // Marchează toate notificările ca citite la click
        }}
      >
        <IoMdNotifications size={24} className="notification-icon" />
        {/* Afișează numărul de notificări necitite, dacă există */}
        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </div>

      {showNotifications && (
        <div className="notification-popup">
          <h4>Notificări</h4>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                {notification.text}
                {/* Iconița de ștergere */}
                <FaTimes
                  className="delete-icon"
                  onClick={() => handleDeleteNotification(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;

import React, { useState } from "react";
import { IoMdSend } from "react-icons/io"; // Import the icon from react-icons
import "./NotificationPopup.css"; // Import the CSS file
import axios from 'axios';

const NotificationPopup = ({ isOpen, onClose, notificationMessage }) => {
	const [announcement, setAnnouncement] = useState(""); // State to hold input value
	const [error, setError] = useState([]);
	if (!isOpen) return null; // Don't render if not open

	// Function to handle input change
	const handleInputChange = (e) => {
		setAnnouncement(e.target.value); // Update state with input value
	};

	const handleSubmit = async () => {

		const userId = localStorage.getItem("userId");

		// Create an object with form data
		const addNotificationForm = {
			userId,
			announcement
		};


		try {
			const response = await axios.post(`http://localhost:3002/local/send-notification`, addNotificationForm, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				console.log("Notification created successfully!");
				
			} else {
				setError("Failed to create notification.");
			}
		} catch (error) {
			console.error("Error creating notification:", error);
			setError("Failed to create pet profile.");
		}
		console.log(addNotificationForm); // Do something with the announcement (e.g., send it)
		setAnnouncement(""); // Clear the input field after submission
		//conexiunea ======>>>>>
	};

	return (
		<div className="message_notification-popup">
			<div className="SendNotification_Content">
				<div className="input_filed">
					<input type="text" className="announcement_input" placeholder="Share an announcement" required value={announcement} onChange={handleInputChange} />
					<button className="send_button" onClick={handleSubmit}>
						<IoMdSend size={20} /> {/* React Icon as button content */}
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotificationPopup;

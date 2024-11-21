import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import axios from 'axios';

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '400px',
    padding: '20px',
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'auto',
    wordBreak: 'break-all',
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

export default function Modal({ 
    open, 
    onClose, 
    title, 
    description, 
    urgency, 
    skills, // Expecting a string with comma-separated values
    location, 
    startTime,
    endTime,
    onRemove,
    eventId,
    onRegister, 
    onUnregister
}) {
    const [isTrueReg, setIsTrueReg] = useState(false);
    const modalRef = useRef(null);

    // Convert skills string to an array
    const skillsArray = typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : [];

    useEffect(() => {
        
        if (open) {
            // Check if the user is already registered for the event when the modal opens
            const userID = sessionStorage.getItem('username');
            if (userID) {
                axios.get(`http://localhost:3001/api/checkRegistration/${userID}/${eventId}`)
                    .then((response) => {
                        setIsTrueReg(response.data.isRegistered); // Set true or false based on the response
                    })
                    .catch((error) => {
                        console.error('Error checking registration status:', error);
                    });
            }
        }
    }, [open, eventId]);
    const handleDelete = (e) => {
        e.stopPropagation();
        const userID = sessionStorage.getItem('username');
        axios.delete(`http://localhost:3001/api/deleteRegisteredEvent/${userID}`, { data: { title } })
            .then((response) => {
                console.log(`User removed registered event "${title}" successfully.`);
                onRemove(); 
                onClose(); 
            })
            .catch((error) => {
                console.error('Error removing registered event:', error);
            });
    };

    const handleReg = (e) => {
        e.stopPropagation();
    
        // Fetch the user ID from session storage
        const userID = sessionStorage.getItem('username');
        console.log('Retrieved userID:', userID);

        const eventData = {
            userID: userID,
            eventsID: eventId,
        };

        const notificationData = {
            userID: userID,
            eventsID: eventId,
            notificationMessage: `You have are signed up for the event: ${title}`,
        };
    
        axios.post('http://localhost:3001/api/registerEvent', eventData)
            .then((response) => {
                console.log(`User has registered for the event: ${title}`);
                setIsTrueReg(true);
                onRegister(eventId);
                onClose();
            })
            .catch((error) => {
                console.error('Error registering event:', error);
            });

        axios.post('http://localhost:3001/createNotification', notificationData)
            .then((response) => {
                console.log(`Notification created for eventId: ${eventId} for user: ${userID}`);
            })
            .catch((error) => {
                console.error(`Error creating notifcation for eventId: ${eventId} for user: ${userID} error:`, error);
            });
    };

    const handleUnreg = (e) => {
        e.stopPropagation();
    
        // Fetch the user ID from session storage
        const userID = sessionStorage.getItem('username');
    
        if (!userID) {
            alert('User ID not found. Please log in again.');
            return;
        }
    
        axios.delete(`http://localhost:3001/api/deleteRegisteredEvent/${userID}`, { data: { eventId } })
            .then((response) => {
                console.log(`User unregistered from the event: ${title}`);
                setIsTrueReg(false);
                onUnregister(eventId);
                onClose();  
            })
            .catch((error) => {
                console.error('Error unregistering event:', error);
            });
    };
    
    

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    if (!open) return null;

    if (!startTime) {
        console.warn("Start time is undefined");
        return null; // Early return if data isn't ready
    }
    console.log("Start time:", startTime);
    
    
    return ReactDOM.createPortal(
        <div style={overlayStyle}>
            <div style={modalStyle} ref={modalRef} className='bg-gray-400'>
                <div className="text-xl text-bold mb-2">{title}</div>
                <div className="text-xs">Location: {location}</div>
                <div style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{description}</div>
                <div>Urgency: {urgency}</div>
                <div style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>Skills Required: 
                    {skillsArray.map((item, index) => (
                        <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }} key={index}>{item}</span>
                    ))}
                </div>
                <div>Date: {startTime} - {endTime}</div>
                <button className="rounded-sm border border-black bg-blue-400 text-white absolute bottom-2 right-18" onClick={(e) => { e.stopPropagation(); onClose(); }}>Close</button>
                {!isTrueReg ? (
                    <button className="rounded-sm border border-black bg-blue-400 text-white absolute bottom-2 right-2" onClick={handleReg}>Register</button>
                ) : (
                    <button className="rounded-sm border border-black bg-red-400 text-white absolute bottom-2 right-2" onClick={handleUnreg}>Unregister</button>
                )}
            </div>
        </div>,
        document.getElementById('portal')
    );
}

// Prop validation
Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urgency: PropTypes.string.isRequired,
    skills: PropTypes.string, // Expecting a string with comma-separated values
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    eventId: PropTypes.string.isRequired,
};

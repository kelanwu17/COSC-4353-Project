import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px', // Set a fixed width for the modal
    height: '400px', // Set a fixed height for the modal
    padding: '20px',
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'auto', // Enable scrolling if content overflows
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


export default function Modal({ open, children, onClose, title, description, urgency, skills, location, date}) {
    const [isTrueReg, setIsTrueReg] = useState(false);
    const modalRef = useRef(null);
    
    function handleReg(e)
    {
        e.stopPropagation(); 
        onClose();
            if (isTrueReg == false)
            {
                setIsTrueReg(true)
            }
            else
            {
                setIsTrueReg(false)
            }
            
    }

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

    return ReactDOM.createPortal(
        <div style={overlayStyle} >
            <div style={modalStyle} ref={modalRef} className='bg-gray-400'>
                
                <div className="text-xl text-bold mb-2">{title}</div>
                <div className="text-xs">Location: {location}, Date: {date}</div>
                <div style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{description}</div>
                <div>Urgency: {urgency}</div>
                <div style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>Skills Required: 
                    {skills.map((item, index) => ( 
                        <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }} key={index}>{item}</span>
                    ))}
                    </div>
                
                <div>Date: {date}</div>
                <button className="rounded-sm border border-black bg-blue-400 text-white absolute bottom-2 right-18 " onClick={(e) => { e.stopPropagation(); onClose(); }}>Close</button>
                <button className="rounded-sm border border-black bg-blue-400 text-white absolute bottom-2 right-2" onClick={handleReg}>Register</button>


            </div>
        </div>,
        document.getElementById('portal')
    );
}

import React from 'react';
import './VolunteerItem.css';
import Modal from './Modal';
import { useState } from 'react';
import AdminModal from './AdminModal';


function VolunteerItem({ title, imgUrl, description, urgency, skills, date, location, onRegister, onRemove, eventId, isRegistered  }) {
  
    const [isOpen, setIsOpen] = useState(false);
    
    const handleOpen = () => {
        setIsOpen(true);
        onRegister(); // Call onRegister when opening the modal
    };

    return (
        <a
            onClick={handleOpen}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-stone-900 rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90 m-4"
        >
           
        {isRegistered && (
          <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold p-1 rotate-45 transform translate-x-1/3 -translate-y-1/2">
            Registered
          </div>
        )}
            <div
                className="w-full h-44 md:h-56 object-cover bg-cover bg-center"
                style={{ backgroundImage: `url(${imgUrl})` }}
            />
            <div className="w-full p-4">
                <hr className="hr-line" />
                <h3 className="text-sm md:text-lg mb-2 md:mb-3 font-semibold">{title}</h3>
                <p className="description">{description}</p>
            </div>


            <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title={title}
          description={description}
          urgency={urgency}
          skills={skills}
          date={date}
          location={location}
          eventId={eventId}
          showRegisterButton={!isRegistered}
                
            />
        </a>
    );
}

export default VolunteerItem;

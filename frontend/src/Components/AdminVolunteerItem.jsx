import './VolunteerItem.css';
import { useState } from 'react';
import AdminModal from './AdminModal';
import axios from 'axios';


function AdminVolunteerItem({ id, title, imgUrl, description, urgency, skills, date, startTime, endTime, location, onEventUpdated}) {
  
  
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div 
            onClick={() => setIsOpen(true)} 
            className="border-2 border-stone-900 rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90 m-4"
        >
            <div 
                className="w-full h-44 md:h-56 object-cover bg-cover bg-center"
                style={{ backgroundImage: `url(${imgUrl})` }}
            />
            <div className="w-full p-4">
                <h3 className="text-sm md:text-lg mb-2 md:mb-3 font-semibold">{title}</h3>
                <p className="description">{description}</p>
            </div>
            {isOpen && (
               <AdminModal
               open={isOpen}
               onClose={() => setIsOpen(false)}
               title={title}
               description={description}
               urgency={urgency}
               skills={skills}
               location={location}
               startTime={startTime}  
               endTime={endTime}      
               eventId={id}
               onSave={onEventUpdated}
           />
            )}
        </div>
    );
}

export default AdminVolunteerItem;

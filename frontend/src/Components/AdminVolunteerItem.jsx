import React from 'react';
import './VolunteerItem.css';

import { useState } from 'react';
import AdminModal from './AdminModal';


function AdminVolunteerItem({ title, imgUrl, description, urgency, skills, date, location }) {
  

   

  
    const [isOpen, setIsOpen] = useState(false)
    return (
        <a 
            onClick={()=>setIsOpen(true)}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-stone-900 rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90 m-4"
        >
           <div 
    className="w-full h-44 md:h-56 object-cover bg-cover bg-center"
    style={{ backgroundImage: `url(${imgUrl})` }}
/>
            <div className="w-full p-4">
                <hr className="hr-line" />
                <h3 className="text-sm md:text-lg mb-2 md:mb-3 font-semibold">{title}</h3>
                <p className="description">
                   {description}
                   
                </p>
            </div>
            <AdminModal open={isOpen} onClose={()=>setIsOpen(false)} title={title} description={description} urgency={urgency} skills={skills} date={date} location={location}></AdminModal>
        </a>
    );
}

export default AdminVolunteerItem;
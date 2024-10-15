import VolunteerItem from "./AdminVolunteerItem";
import AdminNavBar from "./AdminNavBar";
import axios from 'axios';

import React, { useState, useEffect } from "react";


function AdminVolunteerPage() {
    const [events, setEvents] = useState([]);
  
   
    const fetchEvents = () => {
      axios
        .get("http://localhost:3001/api/events")
        .then((response) => {
          console.log("Fetched Events from backend:", response.data);
          setEvents(response.data); 
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    };
  
  
    useEffect(() => {
      fetchEvents();
    }, []);

    return (
      <div>
        <AdminNavBar />

        <div className="flex flex-col md:flex-row items-center justify-center p-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <VolunteerItem
                key={event.id}
                id={event.id} 
                imgUrl={event.imgUrl || "/images/default.png"} 
                title={event.title}
                description={event.description}
                urgency={event.urgency}
                skills={event.skills}
                date={event.timeRange} 
                location={event.location}
                onEventUpdated={fetchEvents}
              />
            ))}
          </div>
        </div>
      </div>



    );
  }
  
  export default AdminVolunteerPage;

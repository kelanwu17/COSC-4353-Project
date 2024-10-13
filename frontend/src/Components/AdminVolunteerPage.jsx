import VolunteerItem from "./AdminVolunteerItem";
import AdminNavBar from "./AdminNavBar";
import axios from 'axios';
import React, { useState, useEffect } from "react";


function AdminVolunteerPage() {
    const [events, setEvents] = useState([]);
  
    // Fetch events from the backend
    const fetchEvents = () => {
      axios
        .get("http://localhost:3001/events")
        .then((response) => {
          console.log("Fetched Events from backend:", response.data);
          setEvents(response.data); // Store the fetched events
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    };
  
    // Use useEffect to fetch events on page load
    useEffect(() => {
      fetchEvents();
    }, []);
  
    console.log("Rendering events:", events);

    return (
      <div>
        <AdminNavBar />
        {console.log("Rendering events:", events)} {/* Log the events here */}

        <div className="flex flex-col md:flex-row items-center justify-center p-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <VolunteerItem
                key={event.id}
                id={event.id} // Using id from backend data as key
                imgUrl={event.imgUrl || "/images/default.png"} // Use default image if imgUrl is missing
                title={event.title}
                description={event.description}
                urgency={event.urgency}
                skills={event.skills}
                date={event.timeRange} // Assuming timeRange is formatted
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

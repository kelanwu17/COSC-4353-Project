import { useEffect, useState } from "react";
import VolunteerItem from "./VolunteerItem";
import Modal from "./Modal";
import UserNavBar from "./UserNavBar";
import axios from "axios";

function VolunteerPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = () => {
    axios
      .get("http://localhost:3001/api/events")
      .then((response) => {
        const publishedEvents = response.data // Only show published events
        setEvents(publishedEvents);
        console.log(publishedEvents)
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  useEffect(() => {
    axios
        .get('http://localhost:3001/api/getRegisteredEvents') // Fetch only registered events
        .then((response) => {
            console.log('Registered Events:', response.data.events);
            setEvents(response.data.events);
        })
        .catch((error) => {
            console.error('Error fetching registered events:', error);
        });
}, []);

useEffect(() => {
  fetchEvents(); 
}, []);

const openModal = (event) => {
  console.log('Opening modal with event:', event); // Debug log
  setSelectedEvent(event); 
  setIsModalOpen(true); 
};

const closeModal = () => {
  setSelectedEvent(null);
  setIsModalOpen(false);
};

const removeEvent = (eventTitle) => {
  setEvents((prevEvents) => 
    prevEvents.filter((event) => event.title !== eventTitle));
};
axios.get(`http://localhost:3001/getNotifications/${sessionStorage.getItem('sessionId')}`)
  .then((response) => {
      console.log(response.data);

      if (response.data.sessionId) {
        sessionStorage.setItem('sessionId', response.data.sessionId);
        console.log('Session ID:', response.data.sessionId);
      }
  })
  .catch((error) => {
      console.log('Error:', error.response ? error.response.data : error.message);
  });


return (
  <div>
    <UserNavBar />
    <div className="flex flex-col md:flex-row items-center justify-center p-8 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <VolunteerItem
            key={event.id}
            imgUrl={event.imgUrl || "/images/default.png"} // Fallback image
            title={event.title}
            description={event.description}
            urgency={event.urgency}
            skills={event.skills}
            date={event.timeRange}
            location={event.location}
            event={event} // Pass the entire event object
            onRegister={() => openModal(event)}
          />
        ))}
      </div>
    </div>
    {selectedEvent && (
                <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    title={selectedEvent.title}
                    description={selectedEvent.description}
                    urgency={selectedEvent.urgency}
                    skills={selectedEvent.skills}
                    location={selectedEvent.location}
                    date={selectedEvent.timeRange}
                    onRemove={() => removeEvent(selectedEvent.title)}
                />
      )}
  </div>
);
}

export default VolunteerPage;
import { useEffect, useState } from "react";
import VolunteerItem from "./VolunteerItem";
import Modal from "./Modal";
import UserNavBar from "./UserNavBar";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function VolunteerPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventId, setEventId] = useState('');
  const [filterOption, setFilterOption] = useState('all'); 
  const [isRegistered, setRegister] = useState(false)
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showOnlyRegistered, setShowOnlyRegistered] = useState(false);


  // Function to fetch published events
  const fetchEvents = () => {
    axios
      .get("http://localhost:3001/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  // Function to fetch registered events
  const fetchRegisteredEvents = () => {
    const userID = sessionStorage.getItem('username');
    if (userID) {
      axios.get(`http://localhost:3001/api/registeredEvents/${userID}`)
        .then((response) => {
          setRegisteredEvents(response.data.map(event => event.eventsID));
        })
        .catch((error) => {
          console.error('Error fetching registered events:', error);
        });
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  

   
      // Check if sessionId exists in sessionStorage before making the request
      const sessionId = sessionStorage.getItem('sessionId');
      if (sessionId) {
        axios.get(`http://localhost:3001/getNotifications/${sessionId}`)
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
      } else {
        console.log('Session ID is null. Skipping notification fetch.');
      }
    }, []);

  const filteredEvents = filterOption === 'registered'
  ? events.filter(event => registeredEvents.includes(event.eventsID))
  : events;

  useEffect(() => {
    if (filterOption === 'registered') {
      fetchRegisteredEvents();
    } else {
      fetchEvents();
    }
  }, [filterOption]);


  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };
  const handleRegisterEvent = (eventId) => {
    setRegisteredEvents((prev) => [...prev, eventId]);
  };
  const handleUnregisterEvent = (eventId) => {
    setRegisteredEvents((prev) => prev.filter(id => id !== eventId));
  };


  const openModal = (event) => {
    console.log('Opening modal with event:', event); // Debug log
    setSelectedEvent(event);
    setEventId(event.eventsID); // Set the event ID here
    console.log('hi',eventId)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
    setEventId(''); // Clear the event ID when closing the modal
  };

  const removeEvent = (eventTitle) => {
    setEvents((prevEvents) => 
      prevEvents.filter((event) => event.title !== eventTitle));
  };

  return (
    <div>
    <UserNavBar 
      showFilter={true} // This enables the filter to be shown in the nav bar
      filterOption={filterOption}
      handleFilterChange={handleFilterChange}
    />

<div className="flex flex-col md:flex-row items-center justify-center p-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <VolunteerItem
              key={event.id}
              imgUrl={event.imgUrl || "/images/default.png"}
              title={event.title}
              description={event.description}
              urgency={event.urgency}
              skills={event.skills}
              date={event.timeRange}
              location={event.location}
              event={event}
              onRegister={() => openModal(event)}
              eventId={eventId}
              isRegistered={registeredEvents.includes(event.eventsID)}
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
          eventId={eventId}
          onRegister={handleRegisterEvent} // Pass handler to update state
          onUnregister={handleUnregisterEvent}
        />
      )}
    </div>
  );
}

export default VolunteerPage;


import React, { useState } from "react";
import Textfield from "@mui/material/TextField";
import dayjs from 'dayjs';
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Autocomplete, TextField, Chip } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";
import axios from "axios"

function EventForm() {
  const [inputValue, setInputValue] = useState("");
  const maxChars = 300;

  const [title, changeTitle] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [timeRange, setTimeRange] = useState([null, null]); 
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  async function submit(e) {
    e.preventDefault();

    const startTime = timeRange[0] ? dayjs(timeRange[0]).format("YYYY-MM-DD HH:mm:ss") : null;
    const endTime = timeRange[1] ? dayjs(timeRange[1]).format("YYYY-MM-DD HH:mm:ss") : null;
    const adminID = 1;

    let urgencyDisplay;
  switch (urgency) {
    case 10: urgencyDisplay = 'Low';
      break;
    case 20: urgencyDisplay = 'Medium';
      break;
    case 30: urgencyDisplay = 'High';
      break;
    default:
      urgencyDisplay = '';
  }
  const combinedSkills = selectedSkills.join(", ");

  console.log({ title,
    description: inputValue, 
    location,
    urgency: urgencyDisplay,
    skills: combinedSkills,
    startTime, 
    endTime,
    adminID
    })

    axios.post('http://localhost:3001/api/createevent', {
      title,
      description: inputValue,
      location,
      urgency: urgencyDisplay,
      skills: combinedSkills,
      startTime,
      endTime,
      adminID
    })
    .then((response) => {
      console.log(response.data);
      fetchEvents()
    }, (error) => {
      console.error('Error:', error.response.data.message);
    });

  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchEvents = () => {
    axios.get('http://localhost:3001/api/events')
    .then((response) => {
      console.log('Stored Events:', response.data); 
      setEvents(response.data);  
    })
    .catch((error) => {
      console.error('Error fetching events:', error);
    });
};

const deleteEvent = (id) => {
  axios.delete(`http://localhost:3001/api/events/${id}`)
    .then((response) => {
      console.log('Event deleted:', response.data);
      fetchEvents(); 
    })
    .catch((error) => {
      console.error('Error deleting event:', error);
    });
};

const editEvent = (event) => {
  setSelectedEvent(event);  
  changeTitle(event.title);  
  setInputValue(event.description); 
  setLocation(event.location);
  setUrgency(event.urgency);
  setSelectedSkills(event.skills || []);  
  const startDate = dayjs(event.timeRange[0]);
  const endDate = dayjs(event.timeRange[1]);
  setTimeRange([startDate, endDate]);
};

const updateEvent = () => {
  if (!selectedEvent) return;
  
  const updatedEvent = { 
    title, 
    description: inputValue,  
    location, 
    urgency,
    skills: selectedSkills, 
    timeRange
  };
  axios.patch(`http://localhost:3001/api/events/${selectedEvent.id}`, updatedEvent)
    .then((response) => {
      console.log('Event updated:', response.data);
      setSelectedEvent(null);  
      fetchEvents(); 
    })
    .catch((error) => {
      console.error('Error updating event:', error);
    });
};

  const skillsList = [
    "Communication",
    "Teamwork",
    "Leadership",
    "Problem-Solving",
    "Time Management",
    "Adaptability",
    "Organizational Skills",
    "Empathy",
    "Fundraising",
    "Event Planning",
    "Public Speaking",
    "Project Management",
    "Mentoring",
    "Crisis Management",
    "Technical Support",
    "Customer Service",
    "Grant Writing",
    "Advocacy",
  ];

  

  return (
    <div>
      <Grid2 container rowSpacing={3}>
        <Grid2 item size={12}>
          <h1>Create New Event</h1>
        </Grid2>
        <Grid2 item size={3}>
          <p>
            <strong>Event Name: </strong>
          </p>
        </Grid2>
        <Grid2 item size={9}>
          <Textfield
            label="Enter event name"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white" }}
            onChange={(e)=> changeTitle(e.target.value)}
          />
        </Grid2>

        <Grid2 item size={3}>
          <p>
            <strong>Description: </strong>
          </p>
        </Grid2>
        <Grid2 item size={9}>
          <Textfield
            multiline
            fullWidth
            label="Enter Description"
            variant="outlined"
            rows="7"
            inputProps={{ maxLength: maxChars }}
            value={inputValue}
            onChange={handleInputChange}
            sx={{ backgroundColor: "white" }}
          />
          <p>{`${maxChars - inputValue.length} characters remaining`}</p>
        </Grid2>

        <Grid2 item size={3}>
          <p>
            <strong>Location: </strong>
          </p>
        </Grid2>
        <Grid2 item size={9}>
          <Textfield
            fullWidth
            label="Address"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid2>

        <Grid2 item size={3}>
          <p>
            <strong>Urgency: </strong>
          </p>
        </Grid2>
        <Grid2 item size={9}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={urgency}
              label="Select"
              onChange={(e) => setUrgency(e.target.value)} 
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value={10}>Low</MenuItem>
              <MenuItem value={20}>Medium</MenuItem>
              <MenuItem value={30}>High</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 item size={3}>
          <p>
            <strong>Skills: </strong>
          </p>
        </Grid2>
        <Grid2 item size={9}>
          <Autocomplete
            multiple
            options={skillsList}
            value={selectedSkills}
            onChange={(event, newValue) => {
              setSelectedSkills(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={index} label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Skill(s)"
                placeholder="Start typing..."
              />
            )}
            sx={{ backgroundColor: "white" }}
          />
        </Grid2>

        <Grid2 item size={3}>
          <p>
            <strong>Time Range: </strong>
          </p>
        </Grid2>
        <Grid2 item size={9}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeRangePicker
              localeText={{ start: "Start", end: "End" }}
              value={timeRange}
              onChange={(newValue) => setTimeRange(newValue)} 
              sx={{ backgroundColor: "white" }}
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 item size={12}>
          {/* Upload Photo
          <AddPhotoAlternateIcon /> */}
          <Box sx={{ textAlign: "center" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="imageUpload"
            />
            <label htmlFor="imageUpload">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>

            {image && (
              <Box mt={2}>
                <Typography variant="h6">Uploaded Image:</Typography>
                <img
                  src={image}
                  alt="Uploaded Preview"
                  style={{ width: "300px", height: "auto", marginTop: "10px" }}
                />
              </Box>
            )}
          </Box>
        </Grid2>
        <Grid2
          item
          size={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained"  onClick={submit}>Create Event</Button>
        </Grid2>


      {selectedEvent && (
  <div>
    <h3>Editing Event: {selectedEvent.title}</h3>

  </div>
)}
      </Grid2>
    </div>
  );
}

export default EventForm;
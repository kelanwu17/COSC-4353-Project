import { useState } from "react";
import UserNavBar from "../../Components/UserNavBar";
import "./User.css";
import Textfield from "@mui/material/TextField";
import { useEffect } from "react";
import { Autocomplete, Chip, stepButtonClasses } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid2,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import VolunteerItem from "../../Components/VolunteerItem";
const UserProfile = () => {
  const [events, setEvents] = useState([]); // Stores event IDs
  const [userEvents, setUserEvents] = useState([]); // Stores event details with names
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
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
  const userID = sessionStorage.getItem("username");

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = () => {
    axios
      .get(`http://localhost:3001/api/registeredEvents/${userID}`)
      .then((response) => {
        // Ensure response.data is an array before mapping
        if (Array.isArray(response.data)) {
          console.log("Registered Events:", response.data);
          const eventIds = response.data.map((event) => event.eventsID); // Use eventsID
          setEvents(eventIds);
       
          // Call fetchEventNames only if eventIds is non-empty
          if (eventIds.length > 0) {
            fetchEventNames(eventIds);
          } else {
            console.warn("No events found for this user.");
          }
        } else {
          console.error("Expected an array but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching registered events:", error);
      });
  };

  const fetchEventNames = (eventIds) => {
    // Confirm eventIds is an array and has elements before making requests
    if (!Array.isArray(eventIds) || eventIds.length === 0) {
      console.error("Invalid eventIds:", eventIds);
      return;
    }

    const eventRequests = eventIds.map((eventsID) =>
      axios.get(`http://localhost:3001/api/events/${eventsID}`)
    );

    Promise.all(eventRequests)
      .then((responses) => {
        const eventDetails = responses.map((response) => response.data);
        setUserEvents(eventDetails);
        console.log("Event Names:", eventDetails);
      })
      .catch((error) => {
        console.error("Error fetching event names:", error);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const username = sessionStorage.getItem("username"); // Get username from session storage
      if (!username) {
        console.error("No username found in session storage.");
        return;
      }
      fetchRegisteredEvents();
      fetchEventNames();

      try {
        const response = await axios.get(
          `http://localhost:3001/getProfile/${username}`
        );
        if (response.data) {
          // Assuming response.data contains the profile information
          const {
            email,
            address,
            address2,
            city,
            zipcode,
            fullName,
            state,
            selectedSkills,
          } = response.data;
          const skillsArray = selectedSkills
            ? selectedSkills.split(",").map((skill) => skill.trim())
            : [];
          // Update state with the fetched data
          setEmail(email);
          setAddress(address);
          setAddress2(address2);
          setCity(city);
          setZipCode(zipcode);
          setFullName(fullName);
          setState(state);
          setSelectedSkills(skillsArray);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again."); // Notify user about the failure
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (event) => {
    event.preventDefault();
    const profileData = {
      fullName,
      email,
      address,
      address2,
      city,
      zipcode,
      state,
      selectedSkills: selectedSkills.join(","),
      // Add any other data you want to send
    };
    const username = sessionStorage.getItem("username");
    try {
      const response = await axios.put(
        `http://localhost:3001/updateprofile/${username}`,
        profileData
      );
      if (response) {
        alert(response.data.message); // Notify user about the successful update
        console.log("Profile updated:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again."); // Notify user about the failure
    }
  };
  const deleteProfile = async (event) => {
    event.preventDefault();

    const username = sessionStorage.getItem("username");
    if (!username) {
      alert("Username not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3001/deleteprofile/${username}`
      );
      if (response) {
        alert(response.data.message); // Notify user about the successful deletion
        console.log("Profile deleted:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile. Please try again."); // Notify user about the failure
    }
  };

  return (
    <div>
      <UserNavBar />
      <Grid2 container>
        <Grid2 item size={6}>
          <div className="user-profile">
            <form>
              <div className="edit-profile-section">
                <div className="profile-name">
                  <label htmlFor="full-name">
                    <strong>Full Name</strong>
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    required
                    placeholder="required"
                    maxLength={50}
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </div>
                <div className="profile-name">
                  <label htmlFor="email">
                    <strong>Username: </strong>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="required"
                    maxLength={50}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="profile-name">
                  <label htmlFor="password">
                    <strong>Password: </strong>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="required"
                    maxLength={50}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="profile-address1">
                  <label htmlFor="address1">
                    <strong>Address</strong>
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    required
                    placeholder="required"
                    maxLength={100}
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
                <div className="profile-address2">
                  <label htmlFor="address2">
                    <strong>Address 2</strong>
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    placeholder="optional"
                    maxLength={100}
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                  />
                </div>
                <div className="profile-state">
                  <label htmlFor="state">
                    <strong>State</strong>
                  </label>
                  <select
                    onChange={(e) => setState(e.target.value)}
                    id="state"
                    name="state"
                    required
                    value={state}
                  >
                    <option value="">Choose a State</option>
                    <option value="TX">TX</option>
                    <option value="NY">NY</option>
                    <option value="CO">CO</option>
                    <option value="HI">HI</option>
                  </select>
                </div>
                <div className="profile-city">
                  <label htmlFor="city">
                    <strong>City</strong>
                  </label>
                  <input
                    value={city}
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="required"
                    maxLength={100}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="profile-zip-code">
                  <label htmlFor="zipCode">
                    <strong>Zip Code</strong>
                  </label>
                  <input
                    value={zipcode}
                    type="text"
                    id="zip-code"
                    name="zip-code"
                    required
                    placeholder="required"
                    maxLength={9}
                    minLength={5}
                    pattern="\d{5,9}"
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>

                <div className="profile-skills">
                  <label>
                    <strong>Skills:</strong>
                  </label>
                  <Autocomplete
                    multiple
                    options={skillsList}
                    value={selectedSkills}
                    onChange={(event, newValue) => {
                      setSelectedSkills(newValue);
                      // Convert the array to a string for storage if needed
                      const skillsString = newValue.join(", "); // or any delimiter you prefer
                      console.log(skillsString); // for debugging, if needed
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Skill(s)"
                        placeholder="Start typing..."
                      />
                    )}
                    sx={{
                      width: 500,
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  />
                </div>
              </div>
              <Button
                className="ml-20"
                onClick={deleteProfile}
                variant="contained"
                color="primary"
              >
                Delete Profile
              </Button>
              <div className="apply-button">
                <Button
                  onClick={updateProfile}
                  variant="contained"
                  color="primary"
                >
                  Apply Changes
                </Button>
              </div>
            </form>
          </div>
        </Grid2>
        <Grid2 size={6}>
          <div className="">
            <label htmlFor="address2">
              <strong>Registered Events History</strong>
            </label>
            <div>
              <ul>
                {userEvents.flat().map((event, index) => (
                  <li>
                  <span key={index}>
                    {event.title}
                    {/* <VolunteerItem title={event.title} /> */}
                  </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <UserProfile />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Textfield from "@mui/material/TextField";
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
function EventForm() {
  const [inputValue, setInputValue] = useState("");
  const maxChars = 300;

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

  const [selectedSkills, setSelectedSkills] = useState([]);

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
            label="City, State"
            variant="outlined"
            sx={{ backgroundColor: "white" }}
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
              // value={age}
              label="Select"
              // onChange={handleChange}
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
          <Button variant="contained">Create Event</Button>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default EventForm;

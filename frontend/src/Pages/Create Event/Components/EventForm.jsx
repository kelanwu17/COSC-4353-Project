import React, { useState } from "react";
import Textfield from "@mui/material/TextField";
import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Autocomplete, TextField, Chip } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
function EventForm() {
  const [inputValue, setInputValue] = useState("");
  const maxChars = 300;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
  "Advocacy"
];


  const [selectedSkills, setSelectedSkills] = useState([]);


  return (
    <div>
      <Grid2 container rowSpacing={3}>
        <Grid2 item size={12}>
          <Textfield label="Enter Event Name" variant="outlined" fullWidth sx={{ backgroundColor: 'white' }}/>
        </Grid2>
        <Grid2 item size={12}>
          <Textfield
            multiline
            fullWidth
            label="Description"
            variant="outlined"
            rows="7"
            inputProps={{ maxLength: maxChars }}
            value={inputValue}
            onChange={handleInputChange}
            sx={{ backgroundColor: 'white' }}
          />
          <p>{`${maxChars - inputValue.length} characters remaining`}</p>
        </Grid2>

        <Grid2 item size={12}>
          <Textfield
            fullWidth
            label="Location (City, State)"
            variant="outlined"
            sx={{ backgroundColor: 'white' }}
          />
        </Grid2>
        <Grid2 item size={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Urgency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Urgency"
              // onChange={handleChange}
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value={10}>Low</MenuItem>
              <MenuItem value={20}>Medium</MenuItem>
              <MenuItem value={30}>High</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 item size={12}>
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
                label="Select Skills"
                placeholder="Start typing..."
              />
            )}
            sx={{ backgroundColor: 'white' }}
          />
        </Grid2>
        <Grid2 item size={12}>
          Upload Photo
          <AddPhotoAlternateIcon />
        </Grid2>
        <Grid2 item size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained">Create Event</Button>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default EventForm;

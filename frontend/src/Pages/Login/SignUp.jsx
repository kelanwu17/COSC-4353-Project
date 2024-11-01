//import './SignUp.css';
import myLogo from "../../Assets/logo.png";
import Textfield from "@mui/material/TextField";
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"
import {useState} from 'react'
import { Autocomplete, Chip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";

import {
  Box,
  Button,
  Grid2,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";



const SignUp = () => {


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

  const history=useNavigate();
  const[email, setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword, setConfirmPassword] = useState('');
  const[address, setAddress] = useState('')
  const[address2, setAddress2] = useState('')
  const[city, setCity] = useState('')
  const[zipcode, setZipCode] = useState('')
  const[availableTime, setAvailableTime] = useState('')
  const[fullName, setFullName] = useState('')

  const [errorMessages, setErrorMessages] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    zipcode: "",
  });

  

  async function submit(e) {
    e.preventDefault();

    // Validate fields
  const newErrorMessages = {};
  if (!fullName) newErrorMessages.fullName = "Full Name is required.";
  if (!email) newErrorMessages.email = "Email is required.";
  if (!password) newErrorMessages.password = "Password is required.";
  if (!confirmPassword) newErrorMessages.password = "You must confirm password.";
  if(password !== confirmPassword){
    newErrorMessages.confirmPassword = "Passwords do not match.";
  }
  if (!address) newErrorMessages.address = "Address is required.";
  if (!city) newErrorMessages.city = "City is required.";
  if (!zipcode) newErrorMessages.zipcode = "Zipcode is required.";

  if (Object.keys(newErrorMessages).length > 0) {
    setErrorMessages(newErrorMessages); // Set error messages and return
    return;
  }
/*
    axios.post('http://localhost:3001/createprofile', {
      fullName, email, password, address, address2, city, zipcode, selectedSkills, availableTime
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

  }
*/
// Proceed with form submission
try {
  const response = await axios.post('http://localhost:3001/createprofile', {
    fullName, email, password, address, address2, city, zipcode, selectedSkills: selectedSkills.join(", ")
  });
  console.log(response);
  // Redirect or show success message here
} catch (error) {
  console.log(error);
}
}
  return (
    <div>
      <Grid2 container spacing={2} alignItems="start">
        <Grid2 item size={6}>
          <img
          
        
            className="logo"
            src={myLogo}
            alt="Logo of our page"
            style={{
              transform: "translateY(200px)",
              marginLeft: "150px",
              width: "500px",
              height: "auto",
              
            }}
          />
        </Grid2>

        <Grid2
          item
          size={6}
          sx={{
            transform: "translateY(50px)",
          }}
        >
          <Grid2 item size={6}>
            <Link to="/">
            <Button variant="text">Back</Button>
            </Link>
          </Grid2>
         
          <Grid2
            
            item
            xs={12}
            alignItems="center"
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              justifyContent: "flex-end",
            }} // Adds some space between fields
          >
             <Grid2 item>
            <p style={{paddingLeft:"10px"}}>
                <strong>Full Name: </strong>
              </p>
            </Grid2>
            <Grid2 item>
              <Textfield
                fullWidth
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                onChange={(e)=> {setFullName(e.target.value)}}
                error={!!errorMessages.fullName}
              helperText={errorMessages.fullName}
              />
            </Grid2>
        
            <Grid2 item>
            <p style={{paddingLeft:"10px"}}>
                <strong>Username: </strong>
              </p>
            </Grid2>
            <Grid2 item>
              <Textfield
                fullWidth
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                onChange={(e)=> {setEmail(e.target.value)}}
              />
            </Grid2>
          </Grid2>
          <Grid2
            
            item
            xs={12}
            alignItems="center"
            sx={{ marginBottom: "10px", justifyContent: "flex-end" }} // Adds some space between fields
          >
            <Grid2 item>
            <p style={{paddingLeft:"10px"}}>
                <strong>Password:</strong>
              </p>
            </Grid2>
            <Grid2 item>
              <Textfield
                fullWidth
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                onChange={(e)=> {setPassword(e.target.value)}}
                error={!!errorMessages.password}
              helperText={errorMessages.password}
                type="password"
              />
            </Grid2>
            
          </Grid2>
          <Grid2
            
            item
            xs={12}
            alignItems="center"
            sx={{ marginBottom: "10px", justifyContent: "flex-end" }} // Adds some space between fields
          >
            <Grid2 item xs={6}>
            <p style={{paddingLeft:"10px"}}>
                <strong>Confirm Password: </strong>
              </p>
            </Grid2>
            <Grid2 item xs={6}>
              <Textfield
                fullWidth
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                onChange={(e) => {setConfirmPassword(e.target.value)}}
                error ={!!errorMessages.confirmPassword}
                helperText={errorMessages.confirmPassword}
                //error={!!errorMessages.confirmPassword}
              //helperText={errorMessages.confirmPassword}
                 type="password"
              />
            </Grid2>
        <Grid2 item>
            <p style={{paddingLeft:"10px",marginTop:"5px"} }>
                <strong>Address: </strong>
              </p>
            </Grid2>
            <Grid2 item>
              <Textfield
                fullWidth
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                onChange={(e)=> {setAddress(e.target.value)}}
                error={!!errorMessages.address}
              helperText={errorMessages.address}
                required
              />
            </Grid2>
            <Grid2 item>
            <p style={{paddingLeft:"10px",marginTop:"5px"}}>
                <strong>Address 2: </strong>
              </p>
            </Grid2>
            <Grid2 item>
              <Textfield
                fullWidth
                label="optional"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                onChange={(e)=> {setAddress2(e.target.value)}}
                
              />
            </Grid2>
            <Grid2 item>
            <p style={{paddingLeft:"10px", marginTop:"5px"}}>
                <strong>City: </strong>
              </p>
            </Grid2>
            <Grid2 item>
              <Textfield
                fullWidth
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                onChange={(e)=> {setCity(e.target.value)}}
                error={!!errorMessages.city}
              helperText={errorMessages.city}
                required
              />
            </Grid2>
            <Grid2 item>
            <p style={{paddingLeft:"10px", marginTop:"5px"}}>
                <strong>Zipcode: </strong>
              </p>
            </Grid2>
            <Grid2 item>
              <Textfield
                fullWidth
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                onChange={(e)=> {setZipCode(e.target.value)}}
                error={!!errorMessages.zipcode}
              helperText={errorMessages.zipcode}
                required
              />
            </Grid2>
          </Grid2>
          <div >
            <Grid2 item size={3}>
          <p className="translate-x-2">
            <strong>Skills: </strong>
          </p>
        </Grid2>
        <Grid2 item size={9} className="translate-x-2">
          <Autocomplete
          className="justify-between"
            multiple
            style={{width:"500px"}}
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
                style={{width:"500px"}}
                
              />
            )}
            sx={{ backgroundColor: "white" }}
          />
        </Grid2>
        </div>
        <div>
           
        </div>
          <Grid2
            item
            size={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
              marginRight: "180px",
              marginBottom:"20px",
            }}
            
          >
            <Button variant="contained" onClick={submit}>Confirm</Button>
          </Grid2>
         
        </Grid2>
      </Grid2>
    </div>

    
  );
};
function SignUpPage() {
  return (
    <div className="SignUpPage">
      <SignUp />
    </div>
  );
}
export default SignUpPage;

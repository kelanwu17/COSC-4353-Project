//import './LogIn.css';
import React, {useState} from "react";
import axios from "axios";
import myLogo from "../../Assets/logo.png";
import Textfield from "@mui/material/TextField";
import {useNavigate, Link} from "react-router-dom"

import {
  Box,
  Button,
  Grid2,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const LogIn = () => {

  //store username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages

  //login form subbmision
  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error

    axios.post('http://localhost:3001/logIn', {
        username, password,
    })
    .then((response) => {
        console.log(response.data); 
      
        if (response.data.sessionId) {
          sessionStorage.setItem('sessionId', response.data.sessionId);
            console.log('Session ID:', response.data.sessionId);
        }
    })
    .catch((error) => {
      // Set the error message based on the response from the server
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Update error message state
      } else {
        setErrorMessage("An unexpected error occurred."); // Generic error message
      }
    });

    sessionStorage.setItem('username', username); 

}



  return (
    <div>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 item size={6}>
          <img
            className="logo"
            src={myLogo}
            alt="Logo of our page"
            style={{
              transform: "translateY(200px)",
              marginLeft: "150px",
              width: "600px",
              height: "auto",
            }}
          />
        </Grid2>

        <Grid2
          item
          size={6}
          sx={{
            transform: "translateY(200px)",
          }}
        >
          <Grid2 item size={6}>
            <Button variant="text">Back</Button>
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
                <strong>Username: </strong>
              </p>
            </Grid2>
            <Grid2 item>
              <Textfield
              required
                width="800px"
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                value = {username}
                //updating username state
                onChange = {(e) => setUsername(e.target.value)}
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
                required
                type = "password"
                value = {password}
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                //update password state
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid2>
          </Grid2>
{/* Error message display */}
{errorMessage && (
    <Grid2 item xs={12} style={{ color: "red", marginTop: "10px", marginLeft: "10px" }}>
        <strong>{errorMessage}</strong>
    </Grid2>
)}
          <Grid2
            item
            size={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
              marginRight: "180px",
            }}
          >
            <Button variant="submit" onClick={handleLogin}>Confirm</Button>
          </Grid2>
          
        </Grid2>
      </Grid2>
    </div>
    
  );
};
function LogInPage() {
  return (
    /*
        <div className="LogInPage">
            <Logo/>
            <LogIn/>
        </div>
        */
    <div className="LogInPage">
      <LogIn />
    </div>
  );
}
export default LogInPage;
import './LogIn.css';
import myLogo from "../../Assets/logo.png";
import Textfield from "@mui/material/TextField";
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"
import {useState} from 'react'
import {
  Box,
  Button,
  Grid2,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
/*
const Logo=()=>{
    return(
        <img className="logo" src= {myLogo} alt="Logo of our page" />
    )
};
*/
const LogIn = () => {
 

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
                width="800px"
                label="required"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                style={{ width: 500, marginLeft: 10, marginRight: 180 }}
                
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
                
              />
            </Grid2>
          </Grid2>

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
            
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
    /*
        <div className="log-in">
            <form>
                <div className="back-button">
                    <button type="submit">BACK</button>
                </div>
                <div className="user-name">
                    <label htmlFor="username"><strong>USERNAME</strong></label>
                    <input type="text" id="username" name="username" required placeholder="required" maxLength={15}/>
                </div>
                <div className="pass-word">
                    <label htmlFor="password"><strong>PASSWORD</strong></label>
                    <input type="text" id="password" name="password" required placeholder="required" maxLength={25}/>
                </div>
                <div className="log-in-button">
                    <button type="submit">LOG IN</button>
                </div>
            </form>
        </div>
        */
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

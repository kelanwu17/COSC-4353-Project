import React, { useState } from "react";
import EventForm from "./Components/EventFormDos";
import NavBar from "../../Components/NavBar";
import { Grid2 } from "@mui/material";
import AdminNavBar from "../../Components/AdminNavBar";
import UserNavBar from "../../Components/UserNavBar";


function CreateEvent() {

  return (
    <div style={{backgroundColor:"#E5E5E5"}}>
      <NavBar/>

      <br></br>
      <Grid2 container justifyContent="">
        <Grid2 item size={1}>

        </Grid2>
        <Grid2 item size={7}>
          <EventForm/>
        </Grid2>
      
      </Grid2>
      
      <br />
      <br />
    </div>
  );
}

export default CreateEvent;

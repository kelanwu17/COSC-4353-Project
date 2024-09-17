import React, { useState } from "react";
import EventForm from "./Components/EventForm";
import NavBar from "../../Components/NavBar";
import { Grid2 } from "@mui/material";


function CreateEvent() {

  




  return (
    <div style={{backgroundColor:"#E5E5E5"}}>
      <NavBar/>
      <Grid2 container>
        <Grid2 item>
          <EventForm/>
        </Grid2>
        
      </Grid2>
      
    </div>
  );
}

export default CreateEvent;

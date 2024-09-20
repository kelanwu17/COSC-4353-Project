import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import volunteerLogo from '../Assets/logo.png';

function NavBar() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{backgroundColor: '#720058'}} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            
              <a href="/"><img src={volunteerLogo} alt="logo" style={{height: "50px"}}/></a>
            </IconButton>
            
            
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;

import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import volunteerLogo from '../Assets/logo.png';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircle from '@mui/icons-material/AccountCircle';

function AdminNavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCreateAdminClick = () => {
    navigate('/createAdmin');
  };

  const handleCreateEventClick = () => {
    navigate('/createevent');
  };

  const handleLogoClick = () => {
    navigate('/adminVolunteer');
  };
   const handleModifyClick = () => {
    navigate('/modifyadmin');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
 
  sessionStorage.clear();
  
  
  navigate('/');
  
  handleCloseMenu();
    handleCloseMenu();
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: '#720058' }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleLogoClick}
            >
              <img src={volunteerLogo} alt="logo" style={{ height: "50px" }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Panel
            </Typography>
            <Button onClick={handleCreateEventClick}>
              <Tooltip title="Create New Event">
                <ControlPointOutlinedIcon fontSize="large" sx={{ color: "white" }} />
              </Tooltip>
            </Button>
           
            <IconButton onClick={handleMenuClick} color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
             
              <MenuItem onClick={handleCreateAdminClick}>Create Admin</MenuItem>
              <MenuItem onClick={handleModifyClick}>Modify Admin</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default AdminNavBar;

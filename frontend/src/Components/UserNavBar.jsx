import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import volunteerLogo from '../Assets/logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UserNavBar({ showFilter, filterOption, handleFilterChange }) {

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  // Handlers for Profile Menu
  const handleProfileMenuOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);

  // Handlers for Notifications Menu
  const handleNotificationsMenuOpen = (event) => setNotificationsAnchorEl(event.currentTarget);
  const handleNotificationsMenuClose = () => setNotificationsAnchorEl(null);

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session storage
    navigate('/'); // Navigate to the homepage
  };

  // Navigate based on session storage
  const handleLogoClick = () => {
    const hasSessionData = sessionStorage.length > 0; // Check if session storage has data
    navigate(hasSessionData ? '/uservolunteer' : '/'); // Navigate accordingly
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: '#720058' }} position="static">
        <Toolbar>
          {/* Logo/Home Link */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
            onClick={handleLogoClick} // Call handleLogoClick on click
          >
            <img src={volunteerLogo} alt="logo" style={{ height: "50px" }} />
          </IconButton>

             {/* Conditional filter dropdown */}
             {showFilter && (
  <FormControl variant="standard" sx={{ minWidth: '200px', marginLeft: '20px' }}>
    <Select
      id="filter-select"
      value={filterOption}
      onChange={handleFilterChange}
      displayEmpty
      sx={{
        backgroundColor: 'transparent', // Transparent background for the initial box
        color: 'white', // White text on the navbar
        fontWeight: 'bold',// Bold text for the initial box
        display: 'flex',
        alignItems: 'center',
        '& .MuiSelect-icon': {
          color: 'white', // Arrow icon stays white
          marginLeft: 'auto', // Ensures the icon is close to the text
        },
        '& .MuiOutlinedInput-notchedOutline': {
          display: 'none', // Remove the outline
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: '#ffffff', // White background for the dropdown
            color: 'black', // Black text inside the dropdown
            fontWeight: 'bold', // Bold text in the dropdown
          },
        },
      }}
    >
      <MenuItem value="all" sx={{ backgroundColor: '#ffffff', color: 'black',}}>
        Show All Events
      </MenuItem>
      <MenuItem value="registered" sx={{ backgroundColor: '#ffffff', color: 'black',}}>
        Show Registered Events
      </MenuItem>
    </Select>
  </FormControl>
)}
          <Box sx={{ flexGrow: 1 }} />

          {/* Notifications Dropdown */}
          <IconButton
            size="large"
            color="inherit"
            aria-label="notifications"
            onClick={handleNotificationsMenuOpen}
          >
            <Badge color="error" variant="dot" invisible={notifications.length === 0}>
              <NotificationsIcon sx={{ color: 'white', fontSize: '2rem' }} />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsMenuClose}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <MenuItem key={index}>{notification}</MenuItem>
              ))
            ) : (
              <MenuItem disabled>No new notifications</MenuItem>
            )}
          </Menu>

          {/* Profile Dropdown */}
          <IconButton
            size="large"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircleIcon sx={{ color: 'white', fontSize: '2rem' }} />
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={() => { handleProfileMenuClose(); window.location.href = '/userprofile'; }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { handleProfileMenuClose(); handleLogout(); }}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default UserNavBar;

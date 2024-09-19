import React from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import volunteerLogo from '../Assets/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function UserNavBar() {
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
            
              <a href="/"><img src={volunteerLogo} alt="logo" height="50"/></a>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
            <Button>
                <Tooltip title="Profile">
                <AccountCircleIcon fontSize="large" sx={{color:"white"}}/>
                </Tooltip>
                
            </Button>
            
            
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default UserNavBar
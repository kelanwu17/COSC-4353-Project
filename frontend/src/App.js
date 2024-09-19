import './App.css';
import CreateEvent from './Pages/Create Event/CreateEvent';
import UserProfile from './Pages/User Profile/UserProfile.jsx';

import ProfileDisplay from './Pages/User Profile/UserDisplay.jsx';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './Pages/Login/LogIn.jsx';
import SignUpPage from './Pages/Login/SignUp.jsx';
import VolunteerPage from './Components/VolunteerPage.jsx';
function App() {
<<<<<<< HEAD
 return ( 
      <HomePage/>
        
    )

=======
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/createevent" element={<CreateEvent/>}/>
          <Route path="/userprofile" element={<UserProfile/>}/>
          <Route path="/uservolunteer" element={<VolunteerPage />}/>
          <Route path="/userdisplay" element={<ProfileDisplay />}/>
        </Routes>
      </Router>
      
      
    </div>
  );
>>>>>>> 01fe11bc6e49a49e629430d50e8ba29b63cae1fc
}

export default App;

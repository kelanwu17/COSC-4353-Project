import './App.css';
import CreateEvent from './Pages/Create Event/CreateEvent';
import UserProfile from './Pages/User Profile/UserProfile';
import ProfileDisplay from './Pages/User Profile/UserDisplay.jsx';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './Pages/Login/LogIn';
import SignUpPage from './Pages/Login/SignUp';
import VolunteerPage from './Components/VolunteerPage.jsx';

import AdminVolunteerPage from './Components/AdminVolunteerPage.jsx';



function App() {
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
          
          <Route path="/adminvolunteer" element={<AdminVolunteerPage/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
5
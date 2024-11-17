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
import CreateAdmin from './Pages/Create Admin/CreateAdmin.jsx';
import ModifyAdmin from './Pages/Modify Admin/ModifyAdmin.jsx';
import AdminReport from './Pages/Admin Reports/adminReport.jsx';
import ManageMembers from './Pages/Manage Member/ManageMembers.jsx';
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
          
          <Route path="/createadmin" element={<CreateAdmin/>}/>
          <Route path="/modifyadmin" element={<ModifyAdmin/>}/>
          <Route path="/adminreports" element={<AdminReport/>}/>
          <Route path="/managemember" element={<ManageMembers/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
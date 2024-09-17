
import './App.css';
import CreateEvent from './Pages/Create Event/CreateEvent';
import UserProfile from './Pages/User Profile/UserProfile.jsx';
import UserVolunteer from './Pages/User Volunteer/UserVolunteer.jsx';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createevent" element={<CreateEvent/>}/>
          <Route path="/userprofile" element={<UserProfile/>}/>
          <Route path="/uservolunteer" element={<UserVolunteer />}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

import './App.css';
import CreateEvent from './Pages/Create Event/CreateEvent';
import UserProfile from './Pages/User Profile/UserProfile.jsx';
import UserVolunteer from './Pages/User Volunteer/UserVolunteer.jsx';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './Pages/Login/LogIn.jsx';
import SignUpPage from './Pages/Login/SignUp.jsx';
function App() {
<<<<<<< HEAD
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/createevent" element={<CreateEvent/>}/>
          <Route path="/userprofile" element={<UserProfile/>}/>
          <Route path="/uservolunteer" element={<UserVolunteer />}/>
          
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
=======
    return ( <
        div className = "App" >

        <
        HomePage / >
        <
        /div>
    )

}

export default App;
>>>>>>> 39ba1993a70888b243ddb0f962332e814d8cf024

import './App.css';
import SignUpPage from './Pages/Login/SignUp';
import UserProfile from './Pages/User Profile/UserProfile';
import UserDisplay from './Pages/User Profile/UserDisplay';
import LogInPage from './Pages/Login/LogIn';
import HomePage from './Pages/Home/Home';

function App() {
    return ( 
      <div>
        <HomePage/>
        <LogInPage/>
        <UserProfile/>
        <UserDisplay/>
      </div>
    )

}

export default App;
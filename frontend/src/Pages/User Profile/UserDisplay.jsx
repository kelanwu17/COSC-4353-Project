import './User.css'
import logo from '../../Assets/logo.png';
import UserVolunteerItem from './UserVolunteerItem';
import UserNavBar from '../../Components/UserNavBar';



const ProfileDisplay=()=>{
  return(
    <div>
      <UserNavBar/>
    
    <fieldset className="user-display-fieldset">
        <div className="display-img" style={{width: '200px'}}>
        <img src={logo} alt="profile picture"></img>
        </div>
        <div className="upcoming-event-display">
          <label className="display-event"><strong>Your Upcoming Events</strong></label>
        </div>
        <div className="user-display">
          <div className="display-section">
            <label className="display-name"><strong>Name:</strong></label>
            <p className="display-name-value">Osvaldo M.</p>
          </div>

          <div className="display-section">
            <label className="display-primary-address"><strong>Address:</strong></label>
            <p className="home-address">12345, UH st.</p>
          </div>

          <div className="display-section">
            <label className="display-city"><strong>City:</strong></label>
            <div className="display-city-value">
              <p>Houston, TX 77204</p>
            </div>
          </div>

          <div className="display-section">
            <label className="display-skills"><strong>Skills:</strong></label>
            <p className="display-skills-value">None</p>
          </div>

          <div className="display-section">
            <label className="display-preferences"><strong>Preferences:</strong></label>
            <p className="display-preferences-value">Volunteer</p>
          </div>

          <div className="display-section">
            <label className="display-availability"><strong>Availability:</strong></label>
            <p className="display-availability-value">09/20/24</p>
          </div>

          <div className="volunteer-section1">
              <UserVolunteerItem
                title="Beach Cleanup"
                imgUrl="https://example.com/beach.jpg"
                description="Join us for a beach cleanup event to protect marine life."
                urgency="High"
                skills="Teamwork, Leadership"
                date="2024-09-25"
                location="Santa Monica Beach"
              />
            </div>

            <div className="edit-button">
              <button type="submit">Edit Profile</button>
            </div>

        </div>
  </fieldset>
  </div>
      )
    }

  

export default ProfileDisplay;
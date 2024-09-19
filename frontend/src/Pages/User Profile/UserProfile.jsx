import './User.css';

const skillsList = [
  "Communication",
  "Teamwork",
  "Leadership",
  "Problem-Solving",
  "Time Management",
  "Adaptability",
  "Organizational Skills",
  "Empathy",
  "Fundraising",
  "Event Planning",
  "Public Speaking",
  "Project Management",
  "Mentoring",
  "Crisis Management",
  "Technical Support",
  "Customer Service",
  "Grant Writing",
  "Advocacy"
];
const UserProfile=()=>{

  return (
    <div className="user-profile">
      <div className="top-bar"></div>
      <form>
        <div className="edit-profile-section">
        <div className="profile-name">
          <label htmlFor="full-name"><strong>Full Name</strong></label>
          <input type="text" id="full-name" name="full-name" required
          placeholder='required'
          maxLength={50}/>
        </div> 
        <div className="profile-address1">
          <label htmlFor="address1"><strong>Primary Address</strong></label>
          <input type="text" id="address1" name="address1" required
          placeholder='required'
          maxLength={100}/>
        </div>
        <div className="profile-address2">
          <label htmlFor="address2"><strong>Address 2</strong></label>
          <input type="text" id="address2" name="address2" placeholder="optional"
          maxLength={100}/>
        </div>
        <div className="profile-city">
          <label htmlFor="city"><strong>City</strong></label>
          <input type="text" id="city" name="city" required
          placeholder='required'
          maxLength={100}/>
        </div>
        <div className="profile-state">
          <label htmlFor="state"><strong>State</strong></label>
          <select id="state" name="state" placeholder='requred' required>
            <option value="">Choose a State</option>
            <option value="Texas">TX</option>
            <option value="New York">NY</option>
            <option value="Colorado">CO</option>
            <option value="Hawaii">HI</option>
          </select>
        </div>
        <div className="profile-zip-code">
          <label htmlFor="zipCode"><strong>Zip Code</strong></label>
          <input type="text" id="zip-code" name="zip-code" placeholder="required" required 
          maxLength={9}
          minLength={5}
          pattern="\d{5,9}"/>
        </div>
        <div className="profile-skills">
          <label htmlFor="skills"><strong>Skills</strong></label>
          <select id="skills" name="skills" required>
            <option value=""></option>
            {skillsList.map((skill, index) => (
          <option key={index} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        <div className="profile-preferences">
          <label htmlFor="preferences"><strong>Preferences</strong></label>
          <textarea id="preferences" name="preferences" placeholder="optional">
          </textarea>
        </div>
        <div className="profile-availability">
          <label htmlFor="availability"><strong>Availability</strong></label>
          <input type="date" id="date" name="date"/>
          </div>
          </div>
    </form>
  </div>
  )
};
const ApplyButton=()=>{
  return(
<div className="apply-button">
      <button type="submit">Apply Changes</button>
      </div>
  )
};

function App() {
  return (
    <div classNameName="App">
     <UserProfile/>
     <ApplyButton/>
    </div>
  );
}

export default App;
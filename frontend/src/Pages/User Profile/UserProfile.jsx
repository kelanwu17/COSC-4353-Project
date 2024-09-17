
import './User.css';


const UserProfile=()=>{

  return (
    <div className="user-profile">
      <div className="top-bar"></div>
      <form>
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
          />
        </div>
        <div className="profile-skills">
          <label htmlFor="skills"><strong>Skills</strong></label>
          <select id="skills" name="skills" required>
            <option value=""></option>
            <option value="skill1">Skill 1</option>
            <option value="skill2">Skill 2</option>
            <option value="skill3">Skill 3</option>
            <option value="skill4">Skill 4</option>
          </select>
        </div>
        <div className="profile-Preferences">
          <label htmlFor="preferences"><strong>Preferences</strong></label>
          <textarea id="Preferences" name="preferences" placeholder="optional">
          </textarea>
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

const ProfileDisplay=()=>{
  return(
    <fieldset>
      <legend><img src="logo192.png" alt="profile picture"/></legend>
    <div className="user-display">
      <div className="display-name">
        <p><strong>Name</strong></p>
        <p>Ozbulla</p>
      </div>
      <div className="display-primary-address">
      <p><strong>Address</strong></p>
      <p>UH</p>
      </div>
     {/*<div className="display-address2">
        <p><strong>Address 2</strong></p>
  </div>*/}
      <div className="display-city">
        <p><strong>City</strong></p>
        <p>Houston</p>
      </div>
      <div className="display-state">
        <p><strong>State</strong></p>
        <p>TX</p>
      </div>
      <div className="display-zip-code">
        <p><strong>Zip Code</strong></p>
        <p>12345</p>
      </div>
      <div className="display-skills">
        <p><strong>Skills</strong></p>
        <p>Call of Duty, Chat Gpt</p>
      </div>
      <div className="display-preferences">
        <p><strong>Preferences</strong></p>
        <p>Men</p>
      </div>
    </div>
    </fieldset>
  )
}

const EditProfile=()=>{
  return(
    <div className="edit-button">
      <button type="submit">Edit Profile</button>
    </div>
    
    )
  }

function App() {
  return (
    <div classNameName="App">
     <UserProfile/>
     <ApplyButton/>
     <ProfileDisplay/>
     <EditProfile/>
    </div>
  );
}

export default App;
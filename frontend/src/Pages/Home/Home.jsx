<<<<<<< HEAD
import React from 'react'

function Home() {
  return (
    <div>Home</div>
  )
}

export default Home
=======
import './Home.css';
import myLogo from "../../Assets/logo.png";

const Logo=()=>{
    return(
        <img className="logo" src= {myLogo} alt="Logo of our page" />
    )
};

const Home=()=>{
    return(
        <div className="home">
            <div className="volunteer-text">
            <h1 className="main-text">Volunteer Hub</h1>
            <p className="sub-text">Find an event near you</p>
            <div className="button-group">
                <button className="btn1">LOG IN</button>
                <button className="btn2">SIGN UP</button>
            </div>
            </div>
        </div>
    )
};

function HomePage(){
    return(
        <div className="HomePage">
            <Logo/>
            <Home/>
        </div>

    );
}


export default HomePage;
>>>>>>> 84bb4d364169174134aa6a2b3289b7094bbfe966

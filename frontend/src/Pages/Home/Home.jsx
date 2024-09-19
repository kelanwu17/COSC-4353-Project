import myLogo from "../../Assets/logo.png";
import {
    Box,
    Button,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
  } from "@mui/material";
/*
const Logo=()=>{
    return(
        <img className="logo" src= {myLogo} alt="Logo of our page" />
    )
};
*/
const Home=()=>{
    return(
    <div>
        <Grid2 container spacing={2} alignItems = "center">

            <Grid2 item size = {6}>
            <img
                className="logo" 
                src= {myLogo}
                alt="Logo of our page"
                style={{
                    transform: 'translateY(200px)',
                    width: '600px',
                    height: 'auto'
                }}
              />
            </Grid2>
            
            <Grid2 item size = {6} textAlign = 'center'
                style = {{
                    transform: 'translateY(200px)',
                }}>
            <Grid2 item size = {6}>
                <h1
                    style={{
                        fontSize: '60px',
                        fontWeight: 'bold'
                    }}
                >Volunteer Hub</h1>
            </Grid2>
            <Grid2 item size = {6}>
                <p
                style={{
                    marginBottom: '80px',
                    fontSize: '30px'

                }}
                >Find an event near you</p>
            </Grid2>
            <Grid2 item size = {6}>
            <Button variant="contained"
                style={{
                    marginRight: '50px'
                }}
                >Sign Up</Button>
            <Button variant="contained">Log In</Button>
            </Grid2>
            </Grid2>
            

        </Grid2>


    </div>
        /*
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
        */
    )
};

function HomePage(){
    // return(
    //     <div className="HomePage">
    //         <Logo/>
    //         <Home/>
    //     </div>

    // );
    return(
        <div className="HomePage">

            <Home/>
        </div>

    );
}


export default HomePage;

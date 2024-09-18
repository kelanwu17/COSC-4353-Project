import './Home.css';

const Logo=()=>{
    return(
        <img className="logo" src="/logo512.png" alt="Logo of our page" />
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
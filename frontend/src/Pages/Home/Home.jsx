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
            <h1 className="main-text">Bold Purple Text</h1>
            <p className="sub-text">Smaller subtext below the main text</p>
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
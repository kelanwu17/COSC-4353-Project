import './LogIn.css';
import myLogo from "../../Assets/logo.png";

const Logo=()=>{
    return(
        <img className="logo" src= {myLogo} alt="Logo of our page" />
    )
};

const LogIn=()=>{

    return (
        <div className="log-in">
            <form>
                <div className="back-button">
                    <button type="submit">BACK</button>
                </div>
                <div className="user-name">
                    <label htmlFor="username"><strong>USERNAME</strong></label>
                    <input type="text" id="username" name="username" required placeholder="required" maxLength={15}/>
                </div>
                <div className="pass-word">
                    <label htmlFor="password"><strong>PASSWORD</strong></label>
                    <input type="text" id="password" name="password" required placeholder="required" maxLength={25}/>
                </div>
                <div className="log-in-button">
                    <button type="submit">LOG IN</button>
                </div>
            </form>
        </div>
    )
};
function LogInPage(){
    return(
        <div className="LogInPage">
            <Logo/>
            <LogIn/>
        </div>

    );
}
export default LogInPage;
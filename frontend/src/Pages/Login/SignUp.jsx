import './SignUp.css';

const Logo=()=>{
    return(
        <img className="logo" src="/logo512.png" alt="Logo of our page" />
    )
};

const SignUp=()=>{

    return (
        <div className="sign-up">
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
                <div className="confirm">
                    <label htmlFor="confirm-password"><strong>CONFIRM PASSWORD</strong></label>
                    <input type="text" id="confirm-password" name="confirm-password" required placeholder="required" maxLength={25}/>
                </div>
                <div className="sign-up-button">
                    <button type="submit">SIGN UP</button>
                </div>
            </form>
        </div>
    )
};
function SignUpPage(){
    return(
        <div className="SignUpPage">
            <Logo/>
            <SignUp/>
        </div>

    );
}
export default SignUpPage;
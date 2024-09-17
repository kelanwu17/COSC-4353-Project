import './SignUp.css';

const BackButton=()=>{
    <div className="back-button">
        <button type="submit">BACK</button>
    </div>
};

const SignUp=()=>{

    return (
        <div className="sign-up">
            <div className="top-bar"></div>
            <form>
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
            </form>
        </div>
    )
};

const SignUpButton=()=>{
    <div className="sign-up-button">
        <button type="submit">SIGN UP</button>
    </div>
};

function SignUpPage(){
    return(
        <div className="SignUpPage">
            <BackButton/>
            <SignUp/>
            <SignUpButton/>
        </div>

    );
}
export default SignUpPage;
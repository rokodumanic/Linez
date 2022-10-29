import { Button, Container } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import {Link, Outlet} from "react-router-dom";
import SignUpNavBar from "../components/navbars/SignUpNavBar";

function LogIn(){
    return(
      <div>
      <SignUpNavBar />
        <Container fluid className="signUp">
            <div className="signUpFormContainer">
                <form>
                    <div className="signUpInputsContainer">
                        <h1>Log in to your account</h1>
                        <input className="signUpInput" type={"text"} placeholder={"Your email"} name={"email"}></input>
                        <input className="signUpInput" type={"text"} placeholder={"Password must contain at least 6 characters"} name={"password"}></input>
                        <p className="signUpParagraph">use 6 or more characters</p>
                    </div>
                    <div className="signUpButtonsContainer">
                        <Button className="signUpButton">Log in</Button>
                        <p className="signUpOrParagraph">or continue with</p>
                        <Link to="/dashboard">
                          <Button className="signUpButton"><FaGoogle className="signUpGoogleIcon"/>Google</Button>
                        </Link>
                    </div>
                </form>
                <p className="signUpToLogInText">Don't have an account? <Link to="/signup">Sign up</Link><Outlet /></p>
            </div>
            <div className="signUpBenefits">
                <ul>
                    <li>Create diagrams</li>
                    <li>Export your work as a PDF or PNG</li>
                    <li>Share your work</li>
                    <li>Save everything online</li>
                </ul>
            </div>
        </Container>
        </div>
    );
}

export default LogIn;
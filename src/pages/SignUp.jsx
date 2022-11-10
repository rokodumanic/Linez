import { Button, Container } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa"
import { Link, Outlet } from "react-router-dom";
import SignUpForm from "../components/forms/signUp";
import SignUpNavBar from "../components/navbars/SignUpNavBar";


function SignUp(){
    return(
        <div>
        <SignUpNavBar/>
        <SignUpForm/>
        </div>
    );
}

export default SignUp;
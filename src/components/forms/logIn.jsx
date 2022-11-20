import React, {useState} from "react";
import { Button, Container } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import {Link, Outlet} from "react-router-dom";

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(target){
        const value = target.value;
        const name = target.name;
        console.log(target);
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <Container fluid className="signUp">
                <div className="signUpFormContainer">
                    <form action="/login" method="post">
                        <div className="signUpInputsContainer">
                            <h1>Log in to your account</h1>
                            <input className="signUpInput" type={"text"} placeholder={"Your email"} name={"email"}></input>
                            <input className="signUpInput" type={"text"} placeholder={"Password must contain at least 6 characters"} name={"password"}></input>
                            <p className="signUpParagraph">use 6 or more characters</p>
                        </div>
                        <div className="signUpButtonsContainer">
                            <Button className="signUpButton" type="submit">Log in</Button>
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
        );}
}

export default LogInForm;
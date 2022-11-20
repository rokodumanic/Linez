import React, {useState} from "react";
import { Button, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            lName: "",
            email: "",
            password: ""
        };
        this.handleInputChange=this.handleInputChange.bind(this);
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
                    <form id="signUpForm" action={"/signup"} method="post">
                        <div className="signUpInputsContainer">
                            <h1>Create your account</h1>
                            <input className="signUpInput" type={"text"} onChange={(e)=>{this.handleInputChange(e.target)}} placeholder={"First name"} name={"fName"} />
                            <input className="signUpInput" type={"text"} onChange={(e)=>{this.handleInputChange(e.target)}} placeholder={"Secound name"} name={"lName"} />
                            <input className="signUpInput" type={"text"} onChange={(e)=>{this.handleInputChange(e.target)}} placeholder={"Your email"} name={"email"} />
                            <input className="signUpInput" type={"text"} onChange={(e)=>{this.handleInputChange(e.target)}} placeholder={"Password must contain at least 6 characters"} name={"password"} />
                            <p className="signUpParagraph">use 6 or more characters</p>
                        </div>
                        <div className="signUpButtonsContainer">
                            <Button className="signUpButton" type="submit">Sign up</Button>
                            <p className="signUpOrParagraph">or continue with</p>
                            <Button className="signUpButton"><FaGoogle className="signUpGoogleIcon"/>Google</Button>
                        </div>
                    </form>
                    <p className="signUpToLogInText">Already have an account? <Link to="/login">Log in</Link><Outlet /></p>
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

export default SignUpForm;
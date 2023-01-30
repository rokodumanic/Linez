import {useEffect, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import bcrypt from "bcryptjs";
const saltRounds = 10;

bcrypt.setRandomFallback((len) => {
	const buf = new Uint8Array(len);

	return buf.map(() => Math.floor(window.crypto.getRandomValues * 256));
});

function SignUpForm(){
    const [user, setUser] = useState({
        fName: "",
        lName: "",
        email: "",
        userHash: ""
    });

    const [password, setPassword] = useState("");

    function handleInputChange(id, name){
        const value = document.getElementById(id).value;
        setUser(user => ({
            ...user,
            [name]: value
        }));
    }

    async function getHash(){
        const hash = 
            bcrypt.genSalt(saltRounds, async function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    setUser(user => ({...user, userHash: hash}));
                    console.log("AAAAAAAAAA:", hash, salt);
                    console.log("Hash Err:", err);
                    console.log("Hash:", user.userHash);
                    const odgovor= bcrypt.getSalt(hash);
                    console.log("odgovor:",odgovor);
                    })
            });
        console.log("PROSA HASH");
        console.log("Hash:", user.userHash);

        return hash;
    }

    async function handleClick(){
        if(password.length <6){
            console.log("Password is too short!");
        } else if(password.length >= 6){
        await getHash();
        await axios.post(process.env.REACT_APP_SERVER_URL + "/signup", {user: user});
        } else{ console.log("ERR with password length!"); }
        console.log("Hash:", user.userHash);

    }

    return(
        <Container fluid className="signUp">
            <div className="signUpFormContainer">
                <form>
                    <div className="signUpInputsContainer">
                        <h1>Create your account</h1>
                        <input className="signUpInput" type={"text"} id={"signUpFName"} onChange={()=>{handleInputChange("signUpFName", "fName")}} placeholder={"First name"} name={"fName"} />
                        <input className="signUpInput" type={"text"} id={"signUpLName"} onChange={()=>{handleInputChange("signUpLName", "lName")}} placeholder={"Secound name"} name={"lName"} />
                        <input className="signUpInput" type={"text"} id={"signUpEmail"} onChange={()=>{handleInputChange("signUpEmail", "email")}} placeholder={"Your email"} name={"email"} />
                        <input className="signUpInput" type={"text"} id={"signUpPassword"} onChange={(e)=>{setPassword(e.target.value)}} placeholder={"Password must contain at least 6 characters"} name={"password"} />
                        <p className="signUpParagraph">use 6 or more characters</p>
                    </div>
                    <div className="signUpButtonsContainer">
                        <Button className="signUpButton" onClick={()=> handleClick()}>Sign up</Button>
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
    );
}


export default SignUpForm;
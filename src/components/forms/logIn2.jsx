import axios from "axios";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import bcrypt from "bcryptjs";
const saltRounds = 10;

function LogInForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    userHash: "",
    userSalt: "",
  });

  function handleInputChange(id, name) {
    const value = document.getElementById(id).value;
    console.log("VALUEEEEE", value);
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
    console.log(user);
  }

  async function getSalt() {
    console.log(user);
    const salt = await axios.post(process.env.REACT_APP_SERVER_URL + "/getsalt", { email: user.email });
    setUser({ ...user, userSalt: salt.data });
  }

  async function getHash() {
    const hashPromise = await new Promise((resolve, reject) => {
        console.log("SSSSSSSSSSSSALTTTTTTT:", user.userSalt);
      bcrypt.hash(user.password, user.userSalt, function (err, hash) {
        Promise.resolve(hash);
        console.log("inside promise, error", err)
        console.log("inside promise hash", hash)
        setUser((user) => ({ ...user, userHash: hash }));
      });
    })
    console.log("PROSA HASH:", user.userHash);
    console.log("PROMISE HASH:", hashPromise);

    return hashPromise;
  }

  async function handleClick() {
    await getHash()
      .then(await axios.post(process.env.REACT_APP_SERVER_URL + "/login", { email: user.email, hash: user.userHash }))
      .catch((err) => {
        console.log("ERR:", err);
      });
  }

  return (
    <Container fluid className="signUp">
      <div className="signUpFormContainer">
        <form>
          <div className="signUpInputsContainer">
            <h1>Log in to your account</h1>
            <input
              className="signUpInput"
              type={"text"}
              placeholder={"Your email"}
              name={"email"}
              id={"logInEmail"}
              onChange={() => handleInputChange("logInEmail", "email")}
            ></input>
            <input
              className="signUpInput"
              type={"text"}
              placeholder={"Password must contain at least 6 characters"}
              name={"password"}
              id={"logInPassword"}
              onChange={() => handleInputChange("logInPassword", "password")}
              onClick={() => getSalt()}
            ></input>
            <p className="signUpParagraph">use 6 or more characters</p>
          </div>
          <div className="signUpButtonsContainer">
            <Button className="signUpButton" onClick={() => handleClick()}>
              Log in
            </Button>
            <p className="signUpOrParagraph">or continue with</p>
            <Link to="/dashboard">
              <Button className="signUpButton">
                <FaGoogle className="signUpGoogleIcon" />
                Google
              </Button>
            </Link>
          </div>
        </form>
        <p className="signUpToLogInText">
          Don't have an account? <Link to="/signup">Sign up</Link>
          <Outlet />
        </p>
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

export default LogInForm;

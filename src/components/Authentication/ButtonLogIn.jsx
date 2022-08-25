import React from "react";

function ButtonLogIn(props) {
  return (
    <button type="submit" className="btn btn-primary btn-lg btn-block">
      {!props.isRegistered ? "Log In" : "Sign Up"}
    </button>
  );
}

export default ButtonLogIn;

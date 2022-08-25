import React from "react";

function SocialMediaLogIn() {
  return (
    <div>
      <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }} role="button">
        <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
      </a>
      <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#55acee" }} role="button">
        <i className="fab fa-twitter me-2"></i>Continue with Twitter
      </a>
    </div>
  );
}

export default SocialMediaLogIn;

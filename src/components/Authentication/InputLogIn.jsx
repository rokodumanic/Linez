import React from "react";

function InputLogIn(props) {
  return (
    <div>
      <input className="form-control form-control-lg mb-3" type="email" placeholder="Email address" />
      <input className="form-control form-control-lg mb-3" type="password" placeholder="Password" />
      {!props.isRegistered && (
        <input className="form-control form-control-lg mb-3" type="password" placeholder="Confirm Password" />
      )}
    </div>
  );
}

export default InputLogIn;

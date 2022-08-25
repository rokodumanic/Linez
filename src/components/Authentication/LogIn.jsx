import React from "react";
import FormLogIn from "./FormLogIn";
import ImageLogIn from "./ImageLogIn";

function LogIn() {
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <ImageLogIn />
          <FormLogIn />
        </div>
      </div>
    </section>
  );
}

export default LogIn;

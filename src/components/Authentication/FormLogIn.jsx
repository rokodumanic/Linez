import InputLogIn from "./InputLogIn";
import SocialMediaLogIn from "./SocialMediaLogIn";
import ButtonLogIn from "./ButtonLogIn";

var userIsRegistered = true;

function FormLogIn() {
  return (
    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <form>
        <InputLogIn isRegistered={userIsRegistered} />
        <div className="d-flex justify-content-around align-items-center mb-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
            <label className="form-check-label"> Remember me </label>
          </div>
          <a>Forgot password?</a>
        </div>
        <div className="d-flex my-4">
          <ButtonLogIn isRegistered={userIsRegistered} />
        </div>
        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
        </div>
        <SocialMediaLogIn />
      </form>
    </div>
  );
}

export default FormLogIn;

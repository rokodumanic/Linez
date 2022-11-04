import React from "react";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: props.fName,
            lName: props.lName,
            username: props.username,
            email: props.email,
            newPassword: "",
            repeatNewPassword: "",
            currentPassword: props.password
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.fName + " " + this.state.lName);
        event.preventDefault();
      }

    render(){
    return(
        <form className="settings w-100 d-flex flex-column align-items-center">
            <div className="settingsContainer">
                <h1>Profile settings</h1>
                <div className="settingsInputContainer">
                    <p className="settingsText">First name</p>
                    <input 
                        className="settingsInput input" 
                        type={"text"} 
                        name={"fName"}
                        value={this.state.fName}
                        onChange={this.handleInputChange}>
                    </input>
                </div>
                <div className="settingsInputContainer">
                    <p className="settingsText">Last name</p>
                    <input 
                        className="settingsInput input" 
                        type={"text"} 
                        name={"lName"}
                        value={this.state.lName}
                        onChange={this.handleInputChange}>
                    </input>
                </div>
            </div>
            <div className="settingsContainer">
                <h1>Account settings</h1>
                <div className="settingsInputContainer">
                    <p className="settingsText">Username</p>
                    <input 
                        className="settingsInput input" 
                        type={"text"} 
                        name={"username"}
                        value={this.state.username}
                        onChange={this.handleInputChange}>
                    </input>
                </div>
                <div className="settingsInputContainer">
                    <p className="settingsText">Email</p>
                    <input 
                        className="settingsInput input" 
                        type={"text"} 
                        name={"email"}
                        value={this.state.email}
                        onChange={this.handleInputChange}>
                    </input>
                </div>
                <div className="settingsInputContainer">
                    <p className="settingsText">Current password</p>
                    <input 
                        className="settingsInput input" 
                        type={"text"} 
                        name={"currentPassword"}
                        onChange={this.handleInputChange}>
                    </input>
                    {/* <p>required</p> */}
                </div>
            </div>
            <div className="settingsContainer">
                <h1>Change password</h1>
                <div className="settingsInputContainer">
                    <p className="settingsText">New password</p>
                    <input 
                        className="settingsInput input" 
                        type={"text"} 
                        name={"newPassword"}
                        onChange={this.handleInputChange}>
                    </input>
                </div>
                <div className="settingsInputContainer">
                    <p className="settingsText">Repeat new password</p>
                    <input 
                        className="settingsInput input" 
                        type={"text"} 
                        name={"repeatNewPassword"}
                        onChange={this.handleInputChange}>
                    </input>
                </div>
                <div className="settingsInputContainer">
                    <p className="settingsText">Current password</p>
                    <input 
                        className="settingsInput input" 
                        type={"text"} 
                        name={"currentPassword"}
                        onChange={this.handleInputChange}>
                    </input>
                </div>
            </div>
            <div className="settingsContainer">
                <h1>Delete account</h1>
                <p>If you delete your Linez account, your data will be lost forever.</p>
                <a>Delete account</a>
            </div>
            <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
    );}
}

export default Settings;
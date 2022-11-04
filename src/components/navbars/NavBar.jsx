import {InfoIcon, BellIcon} from "@primer/octicons-react";
import UserDropdown from "../dropDowns/userIcon";

function NavBar(){
    return(
        <div className="navigationBar">
            <h1 className="wellcomeText">Wellcome</h1>
            <div className="navBarIconContainer">
                <InfoIcon className="navBarIcon" size={24} />
                <BellIcon className="navBarIcon" size={24} />
                <UserDropdown/>
            </div>
        </div>
    )
}


export default NavBar;
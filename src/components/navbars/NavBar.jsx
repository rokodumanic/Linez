import {InfoIcon, BellIcon} from "@primer/octicons-react";
import UserDropdown from "../dropDowns/userIcon";
import NotificationBar from "../dropDowns/bellIcon";

function NavBar(){
    return(
        <div className="navigationBar">
            <h1 className="wellcomeText">Wellcome</h1>
            <div className="navBarIconContainer">
                <InfoIcon className="navBarIcon" size={24} />
                <NotificationBar/>
                <UserDropdown/>
            </div>
        </div>
    )
}


export default NavBar;
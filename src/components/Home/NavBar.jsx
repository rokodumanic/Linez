import { Button, Container, Navbar } from "react-bootstrap";
import {InfoIcon, BellIcon, PersonIcon} from "@primer/octicons-react";

function NavBar(){
    return(
        <div className="navigationBar">
            <h1 className="wellcomeText">Wellcome</h1>
            <div className="navBarIconContainer">
                <InfoIcon className="navBarIcon" size={24} />
                <BellIcon className="navBarIcon" size={24} />
                <PersonIcon className="navBarIcon" size={24} />
            </div>
        </div>
    )
}


export default NavBar;
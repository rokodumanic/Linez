import { Dropdown } from "react-bootstrap";
import {CustomToggle, CustomMenu} from "./DropDown";
import {PersonIcon} from "@primer/octicons-react";
import {Link} from "react-router-dom";


function UserDropdown(){
  return(
    <Dropdown align="end" style={{display:"inline-block"}}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <PersonIcon className="navBarIcon" size={24} />
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="1">Storage</Dropdown.Item>
          <Dropdown.Item eventKey="2"><Link className="blackLink" to="/settings">Settings</Link></Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="1">Log out</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    );
}

export default UserDropdown;
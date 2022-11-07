import { Dropdown } from "react-bootstrap";
import {CustomToggle, CustomMenu} from "./DropDown";
import {BellIcon} from "@primer/octicons-react";
import Notification from "../../popUps/Notification";
import {useState} from "react";
import {Link} from "react-router-dom";
import { nanoid } from "nanoid";
import getElementByKey from "../Canvas/shapes/getElementByKey";


function NotificationBar(){
const [modalShow, setModalShow] = useState(false);
const [notification, setNotification] = useState([]);

function handleClick(props){
    setNotification(props);
    setModalShow(true); 
}

const props=[
    {
        key: nanoid(),
        title:"Wellcome to linez",
        date:"26.10.2023.",
        text:"gmaemblfmvfmb erbvrm fbeb berb ebe bebt bb tbs nst ntsr"
    },
    {
        key: nanoid(),
        title:"Start off",
        date: "27.10.2023."
    }
];
  return(
    <Dropdown align="end" style={{display:"inline-block"}}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <BellIcon className="navBarIcon" size={24} />
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
        {props.length ? props.map((eachNotification) => (
            <Dropdown.Item eventKey={eachNotification.key} onClick={()=>{handleClick(eachNotification)}}>
                    <h4>{eachNotification.title}</h4>
                    <p>{eachNotification.date}</p>
                </Dropdown.Item>
        )) : <Dropdown.Item disabled>You have 0 notifications</Dropdown.Item>}
        </Dropdown.Menu>
        <Notification
        show={modalShow}
        onHide={()=>setModalShow(false)}
        title={notification.title}
        date={notification.date}
        text={notification.text}
    />
    </Dropdown>
    

    );
}

export default NotificationBar;
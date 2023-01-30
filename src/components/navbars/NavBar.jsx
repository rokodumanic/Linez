import {InfoIcon, BellIcon} from "@primer/octicons-react";
import UserDropdown from "../dropDowns/userIcon";
import NotificationBar from "../dropDowns/bellIcon";
import axios from "axios";
import { useState, useEffect } from "react";

function NavBar(props){

    /* const [naslov, setNaslov] = useState("");


    useEffect(() => {
        if(typeof props.projectId == "string"){
          console.log("Property u NavBar useEffect load from DB:", typeof props.projectId);
          loadFromDB(props.projectId);
        }
      }, []);
    // Save canvas
    
      async function loadFromDB (props){
        try{
          const loadedProject = await axios.post(process.env.REACT_APP_SERVER_URL + "/loadProject", {project: props});
          console.log("LoadFromDB:", loadedProject);
          setNaslov(loadedProject.title)
      }
        catch(err){console.log(err)}
      }  */

    return(
        <div className="navigationBar">
            {props.text == "welcome" ? <h1 className="wellcomeText">Wellcome</h1> : null}
            {props.text == "projectName" ? <input placeholder="projectTitle">{/* {naslov} */}</input> : null}
            <div className="navBarIconContainer">
                <InfoIcon className="navBarIcon" size={24} />
                <NotificationBar/>
                <UserDropdown/>
            </div>
        </div>
    )
}


export default NavBar;
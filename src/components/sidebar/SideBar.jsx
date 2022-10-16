import FullSideItems from './FullSideItems';
import { ChevronLeftIcon, ChevronRightIcon, DependabotIcon} from '@primer/octicons-react'
import { useState } from "react";


function SideBar(){
    const [toggle, setToggle] = useState(true);
    
    function toggleSideBar(){
        setToggle(!toggle);
        if(toggle==true){
            document.documentElement.style.setProperty("--sidebar-toggled", "true");
            document.documentElement.style.setProperty("--sidebar-width", "4rem");
            document.documentElement.style.setProperty("--sidebar-item-margin-left", "3.3rem");
            document.documentElement.style.setProperty("--sidebar-title-icon-left", "0.9rem");
            document.documentElement.style.setProperty("--sidebar-title-text-margin-left", "5rem");
        }else if(toggle==false){
            document.documentElement.style.setProperty("--sidebar-toggled", "false");
            document.documentElement.style.setProperty("--sidebar-width", "11rem");
            document.documentElement.style.setProperty("--sidebar-item-margin-left", "1rem");
            document.documentElement.style.setProperty("--sidebar-title-icon-left", "-3rem");
            document.documentElement.style.setProperty("--sidebar-title-text-margin-left", "1rem");
        }
        else{console.log("error, props:", toggle)}
    }

    return(
        <div className="sideBar">
        <div className="sideBarTitle">
            <DependabotIcon className="sideBarTitleIcon" size={36} />
            <h1 className="sideBarTitleText" >Draw </h1>
        </div>
        <div className="topSideBar">
            <FullSideItems/ >
        </div>
        <button className="toggler" onClick={(e)=>toggleSideBar()}>
        {toggle ? <ChevronLeftIcon size={36} /> : <ChevronRightIcon size={36} />}
        </button>
        </div>
    )
}


export default SideBar;
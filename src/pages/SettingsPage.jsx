import Settings from "../components/forms/Settings";
import NavBar from "../components/navbars/NavBar";
import SideBar from "../components/sidebar/SideBar";

function SettingsPage(){
    return(
        <div>
            <SideBar/>
            <NavBar/>
            <Settings/>
        </div>
    );
}

export default SettingsPage;
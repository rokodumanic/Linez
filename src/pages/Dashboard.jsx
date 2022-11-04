import React, { useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import NavBar from "../components/navbars/NavBar";
import Cards from "../components/Home/Cards";
import { nanoid } from "nanoid";
import Canvas from "../components/Canvas/Canvas";
import { Link } from "react-router-dom";

function Dashboard(){
    const [cardClick, setCardClick] = useState(false);
    const [cardInfo, setCard]= useState([
        
        {
            key: nanoid(),
            img: "https://i.pinimg.com/originals/33/21/03/33210312ff2e9406e995a84974e27073.jpg",
            title:"New_File_1",
            text:"",
            lastUpdate:"30.08.2022."
        }]);
    return(
        <div>
            <SideBar />
            <NavBar />
            <div className="dashboard">
                {!cardClick && <div className="row mx-3">
                    <Cards 
                        key={nanoid()}
                        title={"New File"}
                        text={"Start working on a new canvas"}
                        btn={"Start"}
                        to={"/workspace"}
                    />
                {cardInfo.map((eachCard) => {
                    return(
                          <Cards 
                            img={eachCard.img}
                            title={eachCard.title}
                            text={eachCard.text}
                            lastUpdate={eachCard.lastUpdate}
                            btn={eachCard.btn}
                        />
                        )})}
                </div>}
            </div>
        </div>
    );
}

export default Dashboard;
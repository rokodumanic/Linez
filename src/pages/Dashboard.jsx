import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import NavBar from "../components/navbars/NavBar";
import Cards from "../components/Home/Cards";
import { nanoid } from "nanoid";
import Canvas from "../components/Canvas/Canvas";
import { Link } from "react-router-dom";
import axios from "axios";


function Dashboard(){
    const [cardClick, setCardClick] = useState(false);
    const [cardInfo, setCard]= useState([]);
        
    useEffect(() => {
        getProjects();
    },[]);
    async function getProjects() {
        const projectList = await axios.post(process.env.REACT_APP_SERVER_URL + "/dashboard", {})
    .then((response) => {
        console.log("response:", response);
        setCard(response.data.projects);
    }).catch( (error) => {
        console.log("error:", error);
    });};
        /* [
        
        {
            key: nanoid(),
            img: "https://i.pinimg.com/originals/33/21/03/33210312ff2e9406e995a84974e27073.jpg",
            title:"New_File_1",
            text:"",
            lastUpdate:"30.08.2022."
        }] */
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
                        to={""}
                    />
                {cardInfo.map((eachCard) => {
                    console.log(eachCard);
                    return(
                          <Cards 
                            img={eachCard.img}
                            title={eachCard}
                            text={eachCard.text}
                            lastUpdate={eachCard.lastUpdate}
                            btn={"Open"}
                            to={eachCard}
                        />
                        )})}
                </div>}
            </div>
        </div>
    );
}

export default Dashboard;
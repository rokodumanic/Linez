import React, { useState } from "react";
import NavigationBar from "../Navbar";
import Cards from "./Cards";
import { nanoid } from "nanoid";

function Dashboard(){
    const [cardInfo, setCard]= useState([
        {
            key: nanoid(),
            img: "",
            title:"New File",
            text:"Start working on a new canvas",
            lastUpdate:"",
            btn:"Start"
        },
        {
            key: nanoid(),
            img: "https://i.pinimg.com/originals/33/21/03/33210312ff2e9406e995a84974e27073.jpg",
            title:"New_File_1",
            text:"",
            lastUpdate:"30.08.2022."
        }]);
    return(
        <div>
            <NavigationBar />
            <div class="row mx-3">
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
            </div>
        </div>
    );
}

export default Dashboard;
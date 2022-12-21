import React from "react";
import NavBar from "../components/navbars/NavBar";
import Canvas from "../components/Canvas/Canvas";
import { useLocation, useSearchParams } from "react-router-dom";
//import { windowPresets } from "./preset";

function Workspace() {
  const location = useLocation();
  
  const {projectId} = ((location.state == null) ? false : location.state);
  
  console.log("from: ", projectId);
  return (
    <div>
      <NavBar />
      <Canvas projectId={projectId}/>
    </div>
  );
}

export default Workspace;

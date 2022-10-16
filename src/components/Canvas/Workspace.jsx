import React from "react";
import NavBar from "../Home/NavBar";
import SideBar from "../sidebar/SideBar";
import Canvas from "./Canvas";
//import { windowPresets } from "./preset";

function Workspace() {
  // const [canvas, ctx, navHeight] = windowPresets(document, window);

  return (
    <div>
      <SideBar />
      <NavBar />
      <Canvas />
    </div>
  );
}

export default Workspace;

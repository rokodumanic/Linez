import React from "react";
import NavBar from "../components/Home/NavBar";
import SideBar from "../components/sidebar/SideBar";
import Canvas from "../components/Canvas/Canvas";
//import { windowPresets } from "./preset";

function Workspace() {
  // const [canvas, ctx, navHeight] = windowPresets(document, window);

  return (
    <div>
      <NavBar />
      <Canvas />
    </div>
  );
}

export default Workspace;

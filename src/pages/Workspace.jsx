import React from "react";
import NavBar from "../components/navbars/NavBar";
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

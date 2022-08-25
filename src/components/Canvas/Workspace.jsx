import React from "react";
import Navbar from "../Navbar";
import Canvas from "./Canvas";
//import { windowPresets } from "./preset";

function Workspace() {
  // const [canvas, ctx, navHeight] = windowPresets(document, window);

  return (
    <div>
      <Navbar />
      <Canvas />
    </div>
  );
}

export default Workspace;

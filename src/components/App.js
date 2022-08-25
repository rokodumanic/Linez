import React from "react";
import LogIn from "./Authentication/LogIn";
import Dashboard from "./Home/Dashboard";
import Workspace from "./Canvas/Workspace";

var isCardClick = true;

function App(props) {
  return isCardClick ? <Workspace /> : props.isLogged ? <Dashboard /> : <LogIn />;
}

export default App;

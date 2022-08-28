import React from "react";
import LogIn from "./Authentication/LogIn";
import Dashboard from "./Home/Dashboard";
import Workspace from "./Canvas/Workspace";

function App(props) {
  if(props.isLogged){
    return <Dashboard/>
  }else{
    return <LogIn/>
  }}

export default App;

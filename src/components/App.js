import React from "react";
import LogIn from "../pages/LogIn";
import Dashboard from "../pages/Dashboard";
import Workspace from "../pages/Workspace";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";

function App(props) {
  /* if(props.isLogged){
    return <Dashboard/>
  }else{
    return <LogIn/>
  } */
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/workspace" element={ <Workspace/> }/>
        <Route path="/signup" element={ <SignUp /> }/>
        <Route path="/login" element={ <LogIn/> }/>
        <Route path="/dashboard" element={ <Dashboard/> }/>
        <Route path="/" element={ <Home/> } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

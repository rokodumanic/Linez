import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>;

var userIsLoggedIn = true;

const root = createRoot(document.getElementById("root"));

root.render(
    <App isLogged={userIsLoggedIn} />
);

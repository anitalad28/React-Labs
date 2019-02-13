//1. Import React OM
import React from "react";

//2. Import ReactDOM for renderding React Component in DOM
import ReactDom from "react-dom";
import "!style!css!bootstrap/dist/css/bootstrap.min.css";
//import SimpleComponent from "./components/simpleComponent.jsx";
//eactDom.render(<SimpleComponent myname="Anita Lad"/>, document.getElementById("app"))

import ProductComponent from "./components/applications/productUI.component.jsx";
ReactDom.render(<ProductComponent />, document.getElementById("app"))



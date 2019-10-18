import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import store from "./store/store";
console.log("Working!!!!!");

render(
    <App store={store}/>,
  document.getElementById("root")
);

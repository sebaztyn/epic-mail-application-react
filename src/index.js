import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom'
import App from "./components/App";
import store from "./store/store";
console.log("Working!!!!!");

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);


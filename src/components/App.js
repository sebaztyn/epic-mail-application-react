import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import MainIndex from "./MainIndex.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import MessageIndex from "./MessageIndex.jsx";
import { hot } from "react-hot-loader/root";
import "../css/tailwind.scss";

const App = () => (
  <div className="text-center bg-gray-400 min-h-screen text-gray-700 p-2">
    <Router>
      <Switch>
        <Route path="/" component={MainIndex} exact></Route>
        <Route path="/main" component={MessageIndex}></Route>
      </Switch>
    </Router>
  </div>
);
export default withRouter(hot(App));

import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import Navbar from "./Navbar.jsx";
import MyGroup from "./MyGroup.jsx";
import CreateGroup from "./CreateGroup.jsx";

export class GroupIndex extends Component {
  render() {
    if (!localStorage.getItem("token")) return navigate("/login");
    return (
      <div>
        <Navbar />
        <Router>
          <MyGroup path="my_group" />
          <CreateGroup path="create_group" />
        </Router>
      </div>
    );
  }
}

export default GroupIndex;

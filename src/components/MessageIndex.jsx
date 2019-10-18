import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import Navbar from "./Navbar.jsx";
import Inbox from "./Inbox.jsx";
import SentMessage from "./SentMessage.jsx";
import GroupIndex from "./ViewGroup.jsx";
import MyGroup from "./MyGroup.jsx";
import UnreadMessages from "./UnreadMessages.jsx";
import CreateMessage from "./CreateMessage.jsx";
import CreateGroup from "./CreateGroup.jsx";

class MessageIndex extends Component {
  render() {
    if (!localStorage.getItem("token")) return navigate("/login");
    return (
      <div>
        <Navbar />
        <Router>
          <Inbox path="/inbox" />
          <CreateMessage path="/create_message" />
          <SentMessage path="/sent" />
          <UnreadMessages path="/unread" />
          <GroupIndex path="/group" />
          <MyGroup path="/my_group" />
          <CreateGroup path="new_group" />
        </Router>
      </div>
    );
  }
}

export default MessageIndex;

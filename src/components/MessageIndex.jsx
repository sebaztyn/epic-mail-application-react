import React, { Component } from "react";
// import { Router, navigate } from "@reach/router";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
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
    const {path} = this.props.match;
    if (!localStorage.getItem("token")) return <Redirect to="login" />;
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path={path} component={Inbox} exact />
          <Route path={`${path}/sent`} component={SentMessage} exact />
          <Route path={`${path}/unread`} component={UnreadMessages} exact />
          <Route path={`${path}/create_message`} component={CreateMessage} exact />
          <Route path={`${path}/group`} component={GroupIndex} exact />
          <Route path={`${path}/my_group`} component={MyGroup} exact />
          <Route path={`${path}/new_group`} component={CreateGroup} exact />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MessageIndex);

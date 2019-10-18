import React from "react";
import { Router } from "@reach/router";
import MainIndex from "./MainIndex.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import MessageIndex from "./MessageIndex.jsx";
import SentMessage from "./SentMessage.jsx";
import Inbox from "./Inbox.jsx";
import UnreadMessages from "./UnreadMessages.jsx";
import CreateMessage from "./CreateMessage.jsx";
import GroupIndex from "./GroupIndex.jsx";
import MyGroup from "./MyGroup.jsx";
import { hot } from "react-hot-loader/root";
import "../style.css";
import { Provider } from "react-redux";


const App = ({store}) =>(
    <div>
    <Provider store={store}>
      <Router>
        <MainIndex path="/" />
        <Login path="/login" />
        <Signup path="/signup" />
        <MessageIndex path="/main">
          <Inbox path="/inbox" />
          <SentMessage path="/sent" />
          <UnreadMessages path="/unread" />
          <CreateMessage path="/create_message" />
          <GroupIndex path="/group" />
        </MessageIndex>
      </Router>
    </Provider>
    </div>
  )
export default hot(App);

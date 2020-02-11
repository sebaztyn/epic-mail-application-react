import React, { Component } from "react";
import { navigate } from "@reach/router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading.jsx";
import Message from "./Message.jsx";
import MessageDetails from "./MessageDetails.jsx";
import {
  clearMessageStore,
  fetchAllUnreadMessages,
  updateIndividualMessage,
  updateMessageStatus
} from "../actions/messagesAction";
import { setDisplayMessageDetails } from "../actions/displayAction.js";

export class UnreadMessages extends Component {
  componentDidMount() {
    this.intervalFetch = setInterval(this.props.fetchMessagesHandler, 8000);
    this.props.fetchMessagesHandler();
  }
  componentWillUnmount() {
    clearInterval(this.intervalFetch);
    return this.props.clearIndividualMessage();
  }

  indexHandler = event => {
    this.props.setDisplayMessage();
    const id = event.currentTarget.dataset.id;
    const message = this.props.messages.find(msg => {
      return msg.message_id === id;
    });
    return new Promise((resolve, reject) => {
      resolve(this.props.setIndividualMessage(id, message));
    })
      .then(() => {
        const { setMessageStatus, individualMessage } = this.props;
        return setMessageStatus(individualMessage);
      })
      .catch(err => console.log(err.message));
  };
  render() {
    if (!localStorage.getItem("token")) return navigate("/login");
    const {
      sender_email,
      subject,
      message: msg,
      firstname,
      lastname
    } = this.props.individualMessage;
    const {
      messages,
      emptyMessage,
      errorMessage,
      isLoading,
      indexId,
      displayMessageDetail: displayMessage
    } = this.props;
    const unreadMessages = messages.map(message => (
      <Message
        key={message.message_id}
        {...message}
        clickHandler={this.indexHandler}
      />
    ));
    return (
      <div className="flex-1 lg:flex-3 pt-2 sm:left-40 lg:left-20 sm:absolute sm:w-3/5 lg:w-4/5 h-full xs:w-full text-center">
        <div
          className={`pr-2 absolute top-0 left-0 h-full xs:w-full sm:w-full lg:w-2/5 overflow-y-auto overflow-x-hidden ${
            displayMessage === true
              ? "xs:hidden sm:hidden md:hidden"
              : "xs:block sm:block md:block"
          } lg:block`}
        >
          <div className="uppercase text-gray-300 bg-gray-900 font-bold mt-2 mx-auto h-10 flex justify-center items-center w-10/12 sm:w-11/12 mb-4 xs:rounded-t-lg sm:rounded-tr-lg">
            unread messages
          </div>
          {isLoading === true && <Loading />}
          {emptyMessage ? (
            <p>{emptyMessage}</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            unreadMessages
          )}
        </div>
        {indexId ? (
          <MessageDetails
            active={indexId}
            email={sender_email}
            subject={subject}
            message={msg}
            firstname={firstname}
            lastname={lastname}
            how="From:"
          />
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessagesHandler: () => dispatch(fetchAllUnreadMessages()),
    clearIndividualMessage: () => dispatch(clearMessageStore()),
    setIndividualMessage: (messageId, message) =>
      dispatch(updateIndividualMessage(messageId, message)),
    setMessageStatus: message => dispatch(updateMessageStatus(message)),
    setDisplayMessage: () => dispatch(setDisplayMessageDetails(true))
  };
};
const mapStateToProps = state => {
  const {
    messages,
    individualMessage,
    emptyMessage,
    errorMessage,
    indexId,
    isLoading
  } = state.messageStore;
  const { displayMessageDetail } = state.displayMessage;
  return {
    messages,
    individualMessage,
    emptyMessage,
    errorMessage,
    indexId,
    isLoading,
    displayMessageDetail
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UnreadMessages)
);

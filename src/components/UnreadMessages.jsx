import React, { Component } from "react";
import { navigate } from "@reach/router";
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
      indexId
    } = this.props;
    const unreadMessages = messages.map(message => (
      <Message
        key={message.message_id}
        {...message}
        clickHandler={this.indexHandler}
      />
    ));
    if (isLoading === true) return <Loading />;
    return (
      <div className="unread-messages">
        {emptyMessage ? (
          <p>{emptyMessage}</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          unreadMessages
        )}
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
    setMessageStatus: message => dispatch(updateMessageStatus(message))
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
  return {
    messages,
    individualMessage,
    emptyMessage,
    errorMessage,
    indexId,
    isLoading
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnreadMessages);

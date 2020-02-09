import React, { Component } from "react";
import { navigate } from "@reach/router";
import Loading from "./Loading.jsx";
import Message from "./Message.jsx";
import MessageDetails from "./MessageDetails.jsx";
import {
  inboxAction,
  updateIndividualMessage,
  updateMessageStatus,
  clearMessageStore
} from "../actions/messagesAction";
import { connect } from "react-redux";

export class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: true
    };
  }
  componentDidMount() {
    const { fetchData } = this.props;
    this.intervalFetch = setInterval(fetchData, 8000);
    fetchData();
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
    const messageInbox = messages.map(message => (
      <Message
        {...message}
        key={message.message_id}
        clickHandler={this.indexHandler}
      />
    ));
    return (
      <div className="flex-1 lg:flex-3 pt-2 md:left-40 lg:left-20 sm:absolute md:w-1/2 lg:w-4/5 h-full xs:w-full">
        <div className="pr-2 absolute top-0 left-0 md:h-full md:w-full lg:w-2/5 overflow-y-auto overflow-x-hidden">
          {isLoading === true && <Loading />}
          {emptyMessage ? (
            <p>{emptyMessage}</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            messageInbox
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
    fetchData: () => dispatch(inboxAction()),
    setIndividualMessage: (messageId, message) =>
      dispatch(updateIndividualMessage(messageId, message)),
    setMessageStatus: message => dispatch(updateMessageStatus(message)),
    clearIndividualMessage: () => dispatch(clearMessageStore())
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
)(Inbox);

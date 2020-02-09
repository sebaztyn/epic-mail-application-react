import React, { Component } from "react";
import Loading from "./Loading.jsx";
import Message from "./Message.jsx";
import MessageDetails from "./MessageDetails.jsx";
import { connect } from "react-redux";
import {
  getSentMessages,
  getOneSentMessage,
  clearMessageStore
} from "../actions/messagesAction";

export class SentMessage extends Component {
  componentDidMount() {
    const { fetchAllSentMessages } = this.props;
    this.intervalFetch = setInterval(fetchAllSentMessages, 8000);
    fetchAllSentMessages();
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
    return this.props.getASentMessage(id, message);
  };
  render() {
    const {
      email,
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
    const sentMessages = messages.map(message => (
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
            sentMessages
          )}
        </div>
        {indexId ? (
          <MessageDetails
            active={indexId}
            email={email}
            subject={subject}
            message={msg}
            how="To:"
            firstname={firstname}
            lastname={lastname}
          />
        ) : null}
      </div>
    );
  }
}
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
const mapDispatchToProps = dispatch => {
  return {
    fetchAllSentMessages: () => dispatch(getSentMessages()),
    getASentMessage: (id, message) => dispatch(getOneSentMessage(id, message)),
    clearIndividualMessage: () => dispatch(clearMessageStore())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SentMessage);

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createMessageInputAction,
  submitNewMessage
} from "../actions/messagesAction";

export class CreateMessage extends Component {
  submitMessageHandler = e => {
    e.preventDefault();
    const { email, subject, message, onSubmitHandler } = this.props;
    const messageObj = { email, subject, message };
    return onSubmitHandler(messageObj);
  };
  render() {
    const { inputHandler, email, subject, message } = this.props;
    return (
      <div>
        <form action="" method="post" onSubmit={this.submitMessageHandler}>
          <button type="submit">Send</button>
          <button type="reset">Clear</button>
          <input
            type="email"
            name="sender_email"
            id=""
            value={localStorage.getItem("email")}
            disabled
          />
          <input
            type="email"
            name="email"
            id=""
            value={email}
            onChange={inputHandler}
          />
          <input
            type="text"
            name="subject"
            id=""
            value={subject}
            onChange={inputHandler}
          />
          <textarea
            name="message"
            id=""
            cols="30"
            rows="10"
            value={message}
            onChange={inputHandler}
          ></textarea>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { email, subject, message } = state.createMessage;
  return {
    email,
    subject,
    message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    inputHandler: () => dispatch(createMessageInputAction(event)),
    onSubmitHandler: messageObj => dispatch(submitNewMessage(messageObj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMessage);
